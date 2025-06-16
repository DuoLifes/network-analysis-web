<template>
    <div class="login-page">
        <div class="form-box">
            <div class="login-title">接入控制</div>
            <el-form ref="loginFormRef" :model="loginForm">
                <el-form-item
                    prop="userName"
                    :rules="[{ required: true, message: '请填写登录名称', trigger: 'blur' }]"
                >
                    <el-input v-model="loginForm.userName" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon> </template
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="password"
                    :rules="[{ required: true, message: '请填写登录密码', trigger: 'blur' }]"
                >
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        placeholder="密码"
                        autocomplete="off"
                        ><template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon> </template
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        style="width: 100%; margin-top: 10px"
                        type="primary"
                        @click="loginSubmit()"
                        >登 录</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const loginForm = reactive({
    password: 'admin',
    userName: 'admin'
})
const loginFormRef = ref(null)
const loginSubmit = () => {
    loginFormRef.value.validate((valid) => {
        if (valid) {
            router.replace('/user-list')
        } else {
            console.log('验证失败')
            return false
        }
    })
}
</script>
<script>
export default {
    name: 'Login'
}
</script>
<style scoped lang="scss">
.login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url('../../assets/images/login-bg.jpg') center / cover no-repeat;
    .form-box {
        width: 400px;
        border-radius: 5px;
        background: #fff;
        padding: 40px 50px 50px;
        box-sizing: border-box;
        .login-title {
            font-size: 22px;
            color: #333;
            font-weight: bold;
            padding-bottom: 10px;
            text-align: center;
        }
    }
}
</style>
