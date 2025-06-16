import request from '@/utils/request'

export default {
    page(data) {
        return request({
            url: '/v1/account/page',
            method: 'post',
            data
        })
    },
    detail(data) {
        return request({
            url: '/v1/account/get',
            method: 'post',
            data
        })
    },
    update(data) {
        return request({
            url: '/v1/account/update',
            method: 'post',
            data
        })
    },
    resetPassword(data) {
        return request({
            url: '/v1/account/resetPwd',
            method: 'post',
            data
        })
    },
    del(data) {
        return request({
            url: '/v1/account/del',
            method: 'post',
            data
        })
    },
    delAll(data) {
        return request({
            url: '/v1/account/del/batch',
            method: 'post',
            data
        })
    },
    add(data) {
        return request({
            url: '/v1/account/add',
            method: 'post',
            data
        })
    },
    importFile(data) {
        return request({
            url: '/v1/account/importAccount',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data
        })
    },
    // 解锁用户
    unLockAccount(data) {
        return request({
            url: '/v1/account/unLockAccount',
            method: 'post',
            data
        })
    },
}
