import { useState, useEffect } from "react";
import { Play, Pause, Square, RotateCcw, Clock } from "lucide-react";
import {
  getTimer,
  setTimer,
  startTimer,
  pauseTimer,
  resumeTimer,
  stopTimer,
  resetTimer,
  type TimerState,
} from "../../api/admin";
import { useSocket } from "../../context/SocketContext";
import Button from "../../components/ui/Button";

export default function TimerControlPage() {
  const [timerState, setTimerState] = useState<TimerState | null>(null);
  const [timeInput, setTimeInput] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [displayTime, setDisplayTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      
      // Update time input
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      setTimeInput({ hours, minutes, seconds });
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
      setError(null);
      const state = await getTimer();
      setTimerState(state);
      const time = state.displayTime ?? state.timeLeft;
      setDisplayTime(time);
      
      // Update time input
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      setTimeInput({ hours, minutes, seconds });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load timer");
      console.error("Failed to load timer:", err);
    } finally {
      setLoading(false);
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
    } else if (timerState.isPaused && timerState.pausedAt) {
      const elapsed = Math.floor((timerState.pausedAt - (timerState.startTime || 0)) / 1000);
      const remaining = Math.max(0, timerState.timeLeft - elapsed);
      setDisplayTime(remaining);
    } else {
      setDisplayTime(timerState.timeLeft);
    }
  };

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleSetTime = async () => {
    const totalSeconds =
      timeInput.hours * 3600 + timeInput.minutes * 60 + timeInput.seconds;
    
    if (totalSeconds <= 0) {
      setError("Time must be greater than 0");
      return;
    }

    try {
      setError(null);
      const state = await setTimer(totalSeconds);
      setTimerState(state);
      setDisplayTime(state.displayTime ?? state.timeLeft);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to set timer");
    }
  };

  const handleStart = async () => {
    try {
      setError(null);
      const state = await startTimer();
      setTimerState(state);
      setDisplayTime(state.displayTime ?? state.timeLeft);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to start timer");
    }
  };

  const handlePause = async () => {
    try {
      setError(null);
      const state = await pauseTimer();
      setTimerState(state);
      setDisplayTime(state.displayTime ?? state.timeLeft);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to pause timer");
    }
  };

  const handleResume = async () => {
    try {
      setError(null);
      const state = await resumeTimer();
      setTimerState(state);
      setDisplayTime(state.displayTime ?? state.timeLeft);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resume timer");
    }
  };

  const handleStop = async () => {
    try {
      setError(null);
      const state = await stopTimer();
      setTimerState(state);
      setDisplayTime(state.displayTime ?? state.timeLeft);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to stop timer");
    }
  };

  const handleReset = async () => {
    try {
      setError(null);
      const state = await resetTimer();
      setTimerState(state);
      setDisplayTime(state.displayTime ?? state.timeLeft);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset timer");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-[YouMurderer] text-4xl text-red-600 mb-8 tracking-wider">
        TIMER CONTROL
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timer Display */}
        <div className="bg-black/40 backdrop-blur-xl border border-red-600/30 rounded-xl p-8">
          <div className="flex flex-col items-center justify-center">
            <Clock className="text-red-600 mb-4" size={48} />
            <div className="font-[YouMurderer] text-6xl md:text-8xl text-red-600 mb-8 drop-shadow-[0_0_20px_red]">
              {formatTime(displayTime)}
            </div>
            <div className="flex gap-4">
              {!timerState?.isRunning && (
                <Button variant="primary" onClick={handleStart}>
                  <Play size={20} className="mr-2" />
                  Start
                </Button>
              )}
              {timerState?.isRunning && !timerState.isPaused && (
                <Button variant="secondary" onClick={handlePause}>
                  <Pause size={20} className="mr-2" />
                  Pause
                </Button>
              )}
              {timerState?.isPaused && (
                <Button variant="primary" onClick={handleResume}>
                  <Play size={20} className="mr-2" />
                  Resume
                </Button>
              )}
              {timerState?.isRunning && (
                <Button variant="secondary" onClick={handleStop}>
                  <Square size={20} className="mr-2" />
                  Stop
                </Button>
              )}
              <Button variant="secondary" onClick={handleReset}>
                <RotateCcw size={20} className="mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Timer Settings */}
        <div className="bg-black/40 backdrop-blur-xl border border-red-600/30 rounded-xl p-8">
          <h2 className="font-[YouMurderer] text-2xl text-red-600 mb-6">
            SET TIMER
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={timeInput.hours}
                  onChange={(e) =>
                    setTimeInput({
                      ...timeInput,
                      hours: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={timeInput.minutes}
                  onChange={(e) =>
                    setTimeInput({
                      ...timeInput,
                      minutes: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={timeInput.seconds}
                  onChange={(e) =>
                    setTimeInput({
                      ...timeInput,
                      seconds: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <Button variant="primary" onClick={handleSetTime} fullWidth>
              Set Timer
            </Button>
            <div className="mt-6 p-4 bg-black/60 rounded">
              <p className="text-white/70 text-sm mb-2">Current Timer State:</p>
              <p className="text-white/50 text-xs">
                {timerState?.isRunning
                  ? timerState.isPaused
                    ? "⏸ Paused"
                    : "▶ Running"
                  : "⏹ Stopped"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

