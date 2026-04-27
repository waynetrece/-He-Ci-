type Position = "first" | "middle" | "last" | "only";

/**
 * 每個分支自繪的 T-junction 連接器：
 * - 上方水平線段（依位置決定向哪邊延伸到鄰居 16px 接上）
 * - 中間垂直線從水平到分支 box
 *
 * 配合 `gap-8` (32px)，每邊延伸 16px 剛好在 gap 中點銜接，水平線連續無斷點。
 * 在 md 以下（單欄）隱藏，避免錯誤的視覺暗示。
 */
export function ConnectorTop({ position }: { position: Position }) {
  const horizontalCls =
    position === "only"
      ? "left-1/2 right-1/2"
      : position === "first"
        ? "left-1/2 right-[-16px]"
        : position === "last"
          ? "left-[-16px] right-1/2"
          : "left-[-16px] right-[-16px]";

  return (
    <div className="relative hidden h-12 w-full md:block">
      {/* Horizontal segment */}
      <div
        className={`absolute top-0 h-0.5 bg-zinc-500 ${horizontalCls}`}
      />
      {/* Vertical from horizontal down to box */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-zinc-500" />
    </div>
  );
}

export function getPosition(
  index: number,
  total: number,
): Position {
  if (total === 1) return "only";
  if (index === 0) return "first";
  if (index === total - 1) return "last";
  return "middle";
}
