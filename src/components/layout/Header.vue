<template>
    <div class="header-box">
        <div class="menu-wrapper fsc">
            <div class="header-left fc">
                <div class="app-name">{{ $t('app.title') }}</div>
            </div>

            <div class="header-right">
                <el-dropdown @command="handleSetLanguage">
                    <div class="language">
                        {{ $t('language') }}
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="zh-CN" :disabled="$i18n.locale === 'zh-cn'"
                                >中文</el-dropdown-item
                            >
                            <el-dropdown-item command="en-US" :disabled="$i18n.locale === 'en'"
                                >English</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-avatar
                    class="user-avator"
                    :size="30"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        admin
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { setLocalLanguage } from '@/i18n'

const { locale, t, messages } = useI18n()
const router = useRouter()

const handleCommand = (type) => {
    if (type === 'logout') {
        ElMessageBox.confirm('确定退出系统吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                setTimeout(() => {
                    ElMessage.success('退出成功')
                    router.push('/login')
                }, 500)
            })
            .catch(() => {})
    }
}
const handleSetLanguage = (lang) => {
    setLocalLanguage(lang)
}
</script>
<style lang="scss" scoped>
.header-box {
    height: 100%;
    background-color: var(--header-bg-color);
    .menu-wrapper {
        width: 100%;
        margin: 0 auto;
        height: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header-left {
            padding-right: 50px;
            .logo {
                height: 30px;
                margin-right: 10px;
            }
            .app-name {
                font-weight: 600;
                font-size: 18px;
            }
        }
        .menu-box {
            width: 1100px;
            margin: 0 auto;
            height: 100%;
            .item {
                height: 100%;
                line-height: 60px;
                cursor: pointer;
                font-weight: 500;
                font-size: 16px;
                &.active {
                    @include main-active;
                    font-weight: 500;
                }
                &:hover {
                    @include main-active;
                }
                margin: 0 20px;
            }
        }
        .header-right {
            display: flex;
            align-items: center;
            .language {
                color: #fff;
                font-weight: 800;
                cursor: pointer;
            }
            .user-avator {
                margin-left: 20px;
            }

            .user-name {
                margin-left: 10px;
            }

            .el-dropdown-link {
                color: #fff;
                cursor: pointer;
                display: flex;
                align-items: center;
            }

            .el-dropdown-menu__item {
                text-align: center;
            }
        }
    }
}
</style>
