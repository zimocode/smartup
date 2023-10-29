package main

import (
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"time"

	"github.com/go-vgo/robotgo"
)

type Msg struct {
	Timestamp *int64 `json:"timestamp,omitempty"`
	Click     *struct {
		Y int `json:"y"`
		X int `json:"x"`
		B int `json:"b"`
	} `json:"click,omitempty"`
	Key *struct {
		Mod  []string `json:"mod"`
		Keys []string `json:"keys"`
	} `json:"key,omitempty"`
}

func main() {
	msg := `{"version": "0.7"}`
	msgNum := 1
	SendMessage([]byte(msg))
	for {
		length, err := ReadFrom(os.Stdin, 4)
		if nil != err || len(length) < 1 {
			time.Sleep(100 * time.Millisecond)
			continue
		}
		readLength := binary.LittleEndian.Uint32(length)
		text, err := ReadFrom(os.Stdin, int(readLength))

		if nil != err {
			os.Stderr.Write([]byte(fmt.Sprintf("[error] Read msg faild: %v\n", err)))
			continue
		}

		os.Stderr.Write([]byte(fmt.Sprintf("[debug] Received msg: %s\n", text)))

		msgNum += 1
		ProcessRequest(text, msgNum)
	}
}

func ReadFrom(reader io.Reader, num int) ([]byte, error) {
	p := make([]byte, num)
	n, err := reader.Read(p)
	if n > 0 {
		return p[:n], nil
	}
	return p, err
}

func SendMessage(jsonMsg []byte) {
	defer func() {
		if r := recover(); nil != r {
			os.Stderr.Write([]byte(fmt.Sprintf("[panic] Recover from SendMessage: %v\n", r)))
		}
	}()
	bs := make([]byte, 4)
	binary.LittleEndian.PutUint32(bs, uint32(len(jsonMsg)))
	os.Stdout.Write(bs)
	os.Stdout.Write(jsonMsg)
	os.Stderr.Write([]byte(fmt.Sprintf("[debug] sent msg: %s\n", jsonMsg)))
}

func ProcessRequest(req []byte, msgNum int) {
	defer func() {
		if r := recover(); nil != r {
			os.Stderr.Write([]byte(fmt.Sprintf("[panic] Recover from ProcessRequest: %v\n", r)))
			msgText, _ := json.Marshal(map[string]interface{}{"id": msgNum, "ack": req, "resp": map[string]interface{}{}, "timestamp": time.Now().UnixMilli(), "crash": true, "traceback": r})
			SendMessage(msgText)
		}
	}()
	var msg Msg
	err := json.Unmarshal(req, &msg)
	if nil != err {
		os.Stderr.Write([]byte(fmt.Sprintf("[error] Parse msg faild: %s\n", req)))
		panic(`Parse msg faild.`)
	}

	var delay int64
	resp := map[string]interface{}{}

	if nil != msg.Timestamp {
		delay = time.Now().UnixMilli() - *msg.Timestamp
	} else {
		os.Stderr.Write([]byte(fmt.Sprintf("[debug] msg has no timestamp: %v\n", msg)))
	}

	if nil != msg.Click {
		if delay > 2e3 {
			resp["clicked"] = false
		} else {
			robotgo.MoveClick(msg.Click.X, msg.Click.Y, "right", msg.Click.B == 2)
			resp["clicked"] = true
			os.Stderr.Write([]byte(fmt.Sprintf("[debug] MoveClick: %d,%d,right,%d\n", msg.Click.X, msg.Click.Y, msg.Click.B)))
		}
	} else {
		os.Stderr.Write([]byte(fmt.Sprintf("[debug] msg has no click: %v\n", msg)))
	}

	if nil != msg.Key {
		if delay > 2e3 {
			resp["keypressed"] = false
		} else {
			// press modifiers
			if nil != msg.Key.Mod {
				for _, keyChar := range msg.Key.Mod {
					robotgo.KeyDown(keyChar)
					os.Stderr.Write([]byte(fmt.Sprintf("[debug] KeyDown: %s,\n", keyChar)))
					time.Sleep(50 * time.Millisecond)
				}
			}
			// type seq
			if nil != msg.Key.Keys {
				for _, keyChar := range msg.Key.Keys {
					robotgo.KeyTap(keyChar)
					os.Stderr.Write([]byte(fmt.Sprintf("[debug] KeyTap: %s,\n", keyChar)))
				}
			}
			// release modifiers
			if modsLen := len(msg.Key.Mod); modsLen > 0 {
				for i := modsLen - 1; i >= 0; i-- {
					robotgo.KeyUp(msg.Key.Mod[i])
					os.Stderr.Write([]byte(fmt.Sprintf("[debug] KeyUp: %s,\n", msg.Key.Mod[i])))
				}
			}
			resp["keypressed"] = true
		}
	}

	msgText, _ := json.Marshal(map[string]interface{}{"id": msgNum, "ack": msg, "resp": resp, "timestamp": time.Now().Unix(), "delay": delay})
	SendMessage(msgText)
}
