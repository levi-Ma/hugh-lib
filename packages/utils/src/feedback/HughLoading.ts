/**
 * # HughLoading 交互反馈 - 加载
 * @category Feedback
 * @class HughLoading
 * @author HughMa
 */
export class HughLoading {
  /**
   * ## 显示 loading 提示框
   * @param {string} message - 提示的文字内容
   */
  static show(message: string): void {
    uni.showLoading({
      title: message,
      mask: true
    });
  }

  /**
   * ## 隐藏 loading 提示框
   */
  static hide(): void {
    uni.hideLoading();
  }
}
