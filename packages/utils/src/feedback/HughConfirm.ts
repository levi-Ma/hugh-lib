/**
 * # HughConfirm 交互反馈 - 模态弹窗(确认)
 * @category Feedback
 * @class HughConfirm
 * @author HughMa
 */
export class HughConfirm {
  /**
   * ## 取消按钮的文字，默认为"取消"
   */
  protected cancelText: string = '取消';

  /**
   * ## 取消按钮的文字颜色，默认为"#000000"
   */
  protected cancelColor: string = '#000000';

  /**
   * ## 确定按钮的文字，默认为"确定"
   */
  protected confirmText: string = '确定';

  /**
   * ## 设置取消按钮的文字
   * @param {string} cancelText - 取消按钮的文字
   */
  setCancelText(cancelText: string): this {
    this.cancelText = cancelText;
    return this;
  }

  /**
   * ## 设置取消按钮的文字颜色
   * @param {string} cancelColor - 取消按钮的文字颜色
   */
  setCancelColor(cancelColor: string): this {
    this.cancelColor = cancelColor;
    return this;
  }

  /**
   * ## 设置确定按钮的文字
   * @param {string} confirmText - 确定按钮的文字
   */
  setConfirmText(confirmText: string): this {
    this.confirmText = confirmText;
    return this;
  }

  /**
   * ## 模态弹窗
   * @param {string} title - 提示的标题
   * @param {string} [content] - [可选] 提示的内容
   */
  private confirm(title: string, content: string = ''): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      uni.showModal({
        title,
        content,
        cancelText: this.cancelText,
        cancelColor: this.cancelColor,
        confirmText: this.confirmText,
        success: (res) => {
          if (res.confirm) {
            resolve();
            return;
          }
          reject();
        }
      });
    });
  }

  /**
   * ## 创建实例
   */
  static create(): HughConfirm {
    return new HughConfirm();
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
    return this.confirm(title, content);
  }
}
