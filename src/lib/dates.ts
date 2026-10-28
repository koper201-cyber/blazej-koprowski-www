/** Data kalendarzowa i godzina lokalna w Warszawie z offsetem właściwym dla dnia. */
export function eventStart(date: string, time?: string): string {
  if (!time) return date;
  const offsetAt = (utc: number): number => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Warsaw",
      timeZoneName: "longOffset",
    }).formatToParts(new Date(utc));
    const zone = parts.find((p) => p.type === "timeZoneName")?.value;
    const match = zone?.match(/GMT([+-])(\d{2}):(\d{2})/);
    if (!match) throw new Error("Nie można ustalić strefy Europe/Warsaw.");
    return (
      (match[1] === "-" ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3]))
    );
  };
  const wall = Date.parse(`${date}T${time}:00Z`);
  // Dwie możliwości na granicy DST; wybieramy wcześniejsze wystąpienie godziny.
  const offsets = [
    ...new Set([offsetAt(wall - 86400000), offsetAt(wall + 86400000)]),
  ];
  const candidates = offsets.filter(
    (minutes) => offsetAt(wall - minutes * 60000) === minutes,
  );
  if (!candidates.length)
    throw new Error(
      `Godzina ${time} nie istnieje w dniu ${date} w Warszawie (zmiana czasu).`,
    );
  const minutes = Math.max(...candidates);
  const hours = String(Math.floor(Math.abs(minutes) / 60)).padStart(2, "0");
  const rest = String(Math.abs(minutes) % 60).padStart(2, "0");
  return `${date}T${time}:00${minutes < 0 ? "-" : "+"}${hours}:${rest}`;
}
