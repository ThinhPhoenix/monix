<template>
    <div class="download-buttons">
        <a href="#" class="download-btn ios">
            <span class="icon">🍏</span> iOS
        </a>
        <a href="#" class="download-btn android">
            <span class="icon">🤖</span> Android
        </a>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.download-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-top: 2rem;
}

.download-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    color: #fff;
    background: linear-gradient(90deg, #4f8cff 0%, #3358e4 100%);
    box-shadow: 0 2px 8px rgba(79, 140, 255, 0.15);
    transition: background 0.2s, transform 0.2s;
}

.download-btn.ios {
    background: linear-gradient(90deg, #5fc9f8 0%, #3a8dde 100%);
}

.download-btn.android {
    background: linear-gradient(90deg, #4caf50 0%, #388e3c 100%);
}

.download-btn:hover {
    transform: translateY(-2px) scale(1.04);
    filter: brightness(1.1);
}

.icon {
    font-size: 1.3rem;
}
</style>