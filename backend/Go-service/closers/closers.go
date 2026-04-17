package closers

import (
	"io"
	"log/slog"
)

func CloseOrLog(c io.Closer, l *slog.Logger) {
	if err := c.Close(); err != nil {
		l.Error("close failed", "error", err)
	}
}

func CloseOrPanic(c io.Closer) {
	if err := c.Close(); err != nil {
		panic(err)
	}
}
