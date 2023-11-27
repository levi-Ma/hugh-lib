/**
 * # HughMessage 交互反馈 - 消息提示框
 * @category Feedback
 * @class HughMessage
 * @author HughMa
 */
export class HughMessage {
  /**
   * ## 提示的内容
   */
  protected message: string = '';

  /**
   * 设置提示的内容
   * @param {string} message - 提示的内容
   * @returns {this} this - 链式调用
   */
  setMessage(message: string): this {
    this.message = message;
    return this;
  }

  /**
   * ## 消息提示框
   * @param {string} message - 提示的内容
   */
  private messageBox(message: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      uni.showToast({
        title: message,
        icon: 'none',
        mask: true,
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
  static create(): HughMessage {
    return new HughMessage();
  }

  /**
   * ## 显示消息提示框
   * @param {string} message - 提示的内容
   */
  static show(message: string): Promise<void> {
    return this.create().messageBox(message);
  }

  /**
   * ## 显示消息提示框
   * @param {string} message - 提示的内容
   */
  show(message: string): Promise<void> {
    return this.messageBox(message);
  }
}
