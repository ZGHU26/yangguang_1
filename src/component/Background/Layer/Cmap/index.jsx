function cmap(value, min, max) {
  // 将值从[min, max]映射到[0, 1]
  const t = (value - min) / (max - min);
  // 使用t值来计算颜色，这里使用了简单的线性插值
  const r = Math.max(0, Math.min(255, 255 * t));
  const g = Math.max(0, Math.min(255, 255 * (1 - t)));
  const b = 0; // 例如，我们可以固定蓝色分量为0
  return [r, g, b];
}
export default cmap;