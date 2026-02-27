import { useColorTheme } from "@/hooks/useColorTheme";

export function ColorThemePicker() {
  const { theme, setTheme } = useColorTheme();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1"
      title="Switch accent color"
    >
      <button
        onClick={() => setTheme("blue")}
        aria-label="Blue theme"
        className={`h-4 w-4 rounded-full transition-all duration-200 ${
          theme === "blue"
            ? "scale-110 ring-2 ring-white/50 ring-offset-1 ring-offset-transparent"
            : "opacity-40 hover:opacity-70"
        }`}
        style={{ background: "hsl(216 90% 58%)" }}
      />
      <button
        onClick={() => setTheme("gold")}
        aria-label="Gold theme"
        className={`h-4 w-4 rounded-full transition-all duration-200 ${
          theme === "gold"
            ? "scale-110 ring-2 ring-white/50 ring-offset-1 ring-offset-transparent"
            : "opacity-40 hover:opacity-70"
        }`}
        style={{ background: "hsl(38 90% 55%)" }}
      />
    </div>
  );
}
