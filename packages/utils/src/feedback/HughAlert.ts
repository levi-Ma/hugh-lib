/**
 * # HughAlert 交互反馈 - 模态弹窗(消息)
 * @category Feedback
 * @class HughAlert
 * @author HughMa
 */
export class HughAlert {
  /**
   * ## 确定按钮的文字，默认为"确定"
   */
  protected confirmText: string = '确定';

  /**
   * ## 确定按钮的文字颜色
   */
  protected confirmColor: string = '';

  /**
   * ## 设置确定按钮的文字
   * @param {string} confirmText - 确定按钮的文字
   */
  setConfirmText(confirmText: string): this {
    this.confirmText = confirmText;
    return this;
  }

  /**
   * ## 设置确定按钮的文字颜色
   * @param {string} confirmColor - 确定按钮的文字颜色
   */
  setConfirmColor(confirmColor: string): this {
    this.confirmColor = confirmColor;
    return this;
  }

  /**
   * ## 模态弹窗
   * @param {string} title - 提示的标题
   * @param {string} [content] - [可选] 提示的内容
   */
  private alert(title: string, content: string = ''): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      uni.showModal({
        title,
        content,
        showCancel: false,
        confirmText: this.confirmText,
        confirmColor: this.confirmColor,
        success: () => {
          resolve();
        },
        fail: () => {
          reject();
        }
      });
    });
  }

  /**
   * ## 创建实例
   */
  static create(): HughAlert {
    return new HughAlert();
  }

  /**
   * ## 显示模态弹窗
   * @param {string} title - 提示的标题
   * @param {string} [content] - [可选] 提示的内容
   */
  static show(title: string, content: string = ''): Promise<void> {
    return this.create().show(title, content);
  }

  /**
   * ## 显示模态弹窗
   * @param {string} title - 提示的标题
   * @param {string} [content] - [可选] 提示的内容
   */
  show(title: string, content: string = ''): Promise<void> {
    return this.alert(title, content);
  }
}
