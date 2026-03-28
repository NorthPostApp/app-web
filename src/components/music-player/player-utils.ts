const parseMusicDuration = (seconds: number | undefined) => {
  if (seconds !== undefined && seconds >= 0) {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(Math.round(seconds % 60)).padStart(2, "0");
    return `${min}:${sec}`;
  }
  return "--:--";
};

export { parseMusicDuration };
