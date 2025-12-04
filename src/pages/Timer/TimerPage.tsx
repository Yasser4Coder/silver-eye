import { useEffect, useState } from "react";
import { getTimer, type TimerState } from "../../api/admin";
import { useSocket } from "../../context/SocketContext";

export default function TimerPage() {
  const [displayTime, setDisplayTime] = useState(30 * 60 * 60); // Default: 30 hours
  const [timerState, setTimerState] = useState<TimerState | null>(null);
  const { socket, connected } = useSocket();

  // Load initial timer state
  useEffect(() => {
    loadTimerState();
  }, []);

  // Listen for WebSocket timer updates
  useEffect(() => {
    if (!socket || !connected) return;

    const handleTimerUpdate = (data: TimerState) => {
      setTimerState(data);
      const time = data.displayTime ?? data.timeLeft;
      setDisplayTime(time);
    };

    socket.on("timer:update", handleTimerUpdate);

    return () => {
      socket.off("timer:update", handleTimerUpdate);
    };
  }, [socket, connected]);

  // Update display time every second when timer is running
  useEffect(() => {
    if (!timerState) return;

    const interval = setInterval(() => {
      updateDisplayTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [timerState]);

  const loadTimerState = async () => {
    try {
      const state = await getTimer();
      setTimerState(state);
      const time = state.displayTime ?? state.timeLeft;
      setDisplayTime(time);
    } catch (err) {
      console.error("Failed to load timer:", err);
    }
  };

  const updateDisplayTime = () => {
    if (!timerState) return;

    if (timerState.isRunning && !timerState.isPaused && timerState.startTime) {
      const elapsed = Math.floor((Date.now() - timerState.startTime) / 1000);
      const remaining = Math.max(0, timerState.timeLeft - elapsed);
      setDisplayTime(remaining);
      
      if (remaining === 0) {
        // Timer finished - state will be updated via WebSocket
        setDisplayTime(0);
      }
    } else if (timerState.isPaused && timerState.pausedAt && timerState.startTime) {
      const elapsed = Math.floor((timerState.pausedAt - timerState.startTime) / 1000);
      const remaining = Math.max(0, timerState.timeLeft - elapsed);
      setDisplayTime(remaining);
    } else {
      setDisplayTime(timerState.timeLeft);
    }
  };

  const formatTime = (sec: number) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="h-[calc(100vh-90px)]  /* full page except navbar */
                    flex flex-col items-center justify-between
                    text-red-600 select-none py-8">
      <h1 className="font-[YouMurderer] text-5xl tracking-widest">
        TIMER
      </h1>

      <div className="font-[YouMurderer] text-[100px] md:text-[140px] drop-shadow-[0_0_20px_red] leading-none">
        {formatTime(displayTime)}
      </div>

      <h2 className="font-[CFAnarchy] text-5xl tracking-widest">
        MIND PROFILING
      </h2>
    </div>
  );
}
