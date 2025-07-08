<template>
    <div class="page-container">
        <div class="slide-over-panel">
            <div class="slide-over-header">
                <h2 class="slide-over-title">Đăng ký tài khoản</h2>
            </div>
            <div class="slide-over-content">
                <!-- Form đăng ký -->
                <form class="signup-form">
                    <input class="input" type="text" placeholder="Tên người dùng" />
                    <input class="input" type="email" placeholder="Email" />
                    <input class="input" type="password" placeholder="Mật khẩu" />
                    <button class="submit-btn" type="submit">Đăng ký</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUpPage'
}
</script>

<style scoped>
.page-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FEFAE0;
}

.slide-over-panel {
    width: 100%;
    max-width: 480px;
    background: #FEFAE0;
    box-shadow: -4px 0 32px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    animation: slideInFromRight 0.3s ease-out;
}

.slide-over-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid rgba(177, 171, 134, 0.2);
    background: rgba(254, 250, 224, 0.9);
    backdrop-filter: blur(10px);
}

.slide-over-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0A400C;
    margin: 0;
}

.slide-over-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
}

.signup-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.input {
    padding: 12px;
    border: 1.5px solid #B1AB86;
    border-radius: 8px;
    font-size: 1rem;
    background: #fff;
}

.submit-btn {
    padding: 12px;
    background: #B1AB86;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
}

.submit-btn:hover {
    background: #0A400C;
}

@keyframes slideInFromRight {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

@media (max-width: 640px) {
    .slide-over-panel {
        max-width: 100%;
    }

    .slide-over-header {
        padding: 16px;
    }

    .slide-over-content {
        padding: 16px;
    }
}
</style>