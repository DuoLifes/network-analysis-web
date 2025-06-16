import { ElMessage } from 'element-plus'
import { useLangStore } from '../store/lang'
import { getActivePinia } from 'pinia'
import { getCurrentLanguage } from '../i18n'
import CryptoJS from 'crypto-js'

const AES_KEY = 'TXlTZWN1cmVBRVNLRXkhIQ=='

/**
 * AES加密
 * @param {string} text 要加密的文本
 * @returns {string} 加密后的文本
 */
export function aesEncrypt(text) {
    try {
        const key = CryptoJS.enc.Base64.parse(AES_KEY)
        const encrypted = CryptoJS.AES.encrypt(text, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        return encrypted.toString()
    } catch (error) {
        console.error('AES encryption failed:', error)
        return text
    }
}

export function SelfElMessage(options) {
    ElMessage({ duration: 1500, type: 'error', ...options })
}

export function getTemplateUrl(templateName) {
    // 从i18n的帮助函数获取当前语言
    const currentLang = getCurrentLanguage()
    return `${window.$config.templateUrl}${currentLang}/${templateName}`;
}

// 下载流文件
export function downloadFileStream(
    blobFile,
    fileName,
    ext,
    contentType = "application/octet-stream"
  ) {
    let reader = new FileReader();
    reader.onload = function (event) {
      const blob = new Blob([blobFile], { type: contentType });
      let link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
    //   if (!isChinese()) fileName = fileName.replaceAll("+", "_"); // 英文环境替换
    fileName = fileName.replaceAll("+", "_");
      link.download = ext ? fileName + ext : fileName;
      link.click();
      URL.revokeObjectURL(link.href);
      link = null;
    };
    // 读取 Blob 作为文本
    reader.readAsText(blobFile);
  }
