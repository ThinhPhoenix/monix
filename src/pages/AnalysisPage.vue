<template>
    <div class="analysis-search-sticky">
        <InputElement :placeholder="$t('search_analysis')">
            <template #icon-left>
                <span class="search-icon-gap">
                    <Search :size="20" :color="'#B1AB86'" />
                </span>
            </template>
        </InputElement>
    </div>
    <div class="charts-flex">
        <div class="analysis-chart-container">
            <div class="chart-title">{{ $t('monthly_spending') }}</div>
            <canvas ref="chartRef" height="220"></canvas>
        </div>
        <div class="analysis-chart-container">
            <div class="chart-title">{{ $t('category_spending') }}</div>
            <canvas ref="pieChartRef" height="220"></canvas>
        </div>
    </div>
    <div class="analysis-list">
        <div v-if="analyses.length === 0" class="empty-analysis text-center text-[#B1AB86] text-[1.05rem] mt-8">
            {{ $t('no_analysis') }}
        </div>
        <div v-else>
            <div v-for="analysis in analyses" :key="analysis.id"
                class="analysis-card group relative flex items-center gap-4 bg-gradient-to-br from-[#FEFAE0]/80 to-[#B1AB86]/40 border-0 rounded-2xl shadow-xl px-6 py-5 mb-6 overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 cursor-pointer backdrop-blur-md"
                @click="handleAnalysisClick(analysis)">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-white/70 border-2 border-[#B1AB86] shadow-lg mr-3">
                    <span class="text-[#0A400C] text-2xl font-extrabold drop-shadow">{{ analysis.title.charAt(0)
                        }}</span>
                </div>
                <div class="flex-1 flex flex-col min-w-0">
                    <h1 class="font-bold text-[#0A400C] text-lg truncate">{{ analysis.title }}</h1>
                    <div class="text-xs text-[#B1AB86] mt-1">{{ analysis.date }}</div>
                </div>
                <div class="font-extrabold text-[#e74c3c] text-lg ml-2 shrink-0 drop-shadow">
                    -{{ (analysis.amount || 0).toLocaleString() }}₫
                </div>
                <span
                    class="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/60 transition-all duration-200"></span>
            </div>
        </div>
    </div>

    <div v-if="showForm" class="slide-over-overlay" @click="closeForm">
        <div class="slide-over-panel" @click.stop>
            <div class="slide-over-header">
                <h2 class="slide-over-title">{{ editingAnalysis ? $t('edit_analysis') : $t('add_new_analysis') }}</h2>
                <button class="slide-over-close" @click="closeForm">
                    <X :size="24" :color="'#B1AB86'" />
                </button>
            </div>
            <div class="slide-over-content">
                <ManagementForm :analysis="editingAnalysis" @save="handleSave" @cancel="closeForm" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Search, X } from 'lucide-vue-next';
import InputElement from '@/components/elements/InputElement.vue';
import ManagementForm from '@/components/ui/ManagementForm.vue';
import Chart from 'chart.js/auto';

const analyses = ref([
    { id: 1, title: 'Phân tích tháng 7', date: '2025-07-07', value: 10, amount: 3000000, category: 'Ăn uống' },
    { id: 2, title: 'Tổng kết quý 2', date: '2025-07-01', value: 20, amount: 5000000, category: 'Giải trí' },
    { id: 3, title: 'Tháng 6', date: '2025-06-01', value: 15, amount: 2000000, category: 'Ăn uống' },
    { id: 4, title: 'Tháng 5', date: '2025-05-01', value: 12, amount: 1000000, category: 'Mua sắm' }
]);

const showForm = ref(false);
const editingAnalysis = ref(null);

const chartRef = ref(null);
const pieChartRef = ref(null);
let chartInstance = null;
let pieChartInstance = null;

// Bar chart: tổng số tiền theo từng tháng
function renderChart() {
    // Gom nhóm theo tháng (YYYY-MM)
    const monthMap = {};
    analyses.value.forEach(a => {
        const month = a.date.slice(0, 7);
        if (!monthMap[month]) monthMap[month] = 0;
        monthMap[month] += a.amount || 0;
    });
    const labels = Object.keys(monthMap).sort();
    const data = labels.map(m => monthMap[m]);

    if (chartInstance) {
        chartInstance.data.labels = labels;
        chartInstance.data.datasets[0].data = data;
        chartInstance.update();
        return;
    }

    const ctx = chartRef.value.getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: '',
                data,
                backgroundColor: '#B1AB86',
                borderRadius: 8,
                barPercentage: 0.6,
                categoryPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: false },
                tooltip: {
                    callbacks: {
                        label: context => context.parsed.y.toLocaleString() + ' đ'
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#888', font: { size: 13, weight: 600 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: '#eee' },
                    ticks: {
                        color: '#888',
                        font: { size: 13, weight: 600 },
                        callback: value => value.toLocaleString() + ' đ'
                    }
                }
            }
        }
    });
}

// Pie chart: tổng số tiền theo category (dạng donut)
function renderPieChart() {
    // Gom nhóm theo category
    const catMap = {};
    analyses.value.forEach(a => {
        if (!catMap[a.category]) catMap[a.category] = 0;
        catMap[a.category] += a.amount || 0;
    });
    const labels = Object.keys(catMap);
    const data = labels.map(c => catMap[c]);
    const colors = [
        '#B1AB86', // Ăn uống
        '#F9844A', // Giải trí
        '#A3B18A', // Mua sắm
        '#588157',
        '#3A5A40',
        '#344E41',
        '#FFD6A5',
        '#FFB5A7'
    ];

    if (pieChartInstance) {
        pieChartInstance.data.labels = labels;
        pieChartInstance.data.datasets[0].data = data;
        pieChartInstance.data.datasets[0].backgroundColor = colors.slice(0, labels.length);
        pieChartInstance.update();
        return;
    }

    const ctx = pieChartRef.value.getContext('2d');
    pieChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                label: '',
                data,
                backgroundColor: colors.slice(0, labels.length),
                borderWidth: 2,
                borderColor: '#fff',
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            cutout: '65%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#444',
                        font: { size: 13, weight: 600 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => context.label + ': ' + context.parsed.toLocaleString() + ' đ'
                    }
                }
            }
        }
    });
}

onMounted(() => {
    renderChart();
    renderPieChart();
});

watch(analyses, () => {
    renderChart();
    renderPieChart();
}, { deep: true });

function handleAnalysisClick(analysis) {
    editingAnalysis.value = analysis;
    showForm.value = true;
}

function closeForm() {
    showForm.value = false;
    editingAnalysis.value = null;
}

function handleSave(formData) {
    if (editingAnalysis.value) {
        const index = analyses.value.findIndex(a => a.id === editingAnalysis.value.id);
        if (index !== -1) {
            analyses.value[index] = { ...editingAnalysis.value, ...formData };
        }
    } else {
        const newAnalysis = {
            id: Date.now(),
            ...formData
        };
        analyses.value.unshift(newAnalysis);
    }
    closeForm();
}
</script>

<style scoped>
.analysis-search-sticky {
    position: sticky;
    top: 0px;
    z-index: 30;
    backdrop-filter: blur(10px);
    padding: 24px 24px 0px 24px;
    margin-bottom: 16px;
    border-radius: 0 0 18px 18px;
    box-shadow: 0 4px 24px 0 rgba(177, 171, 134, 0.10);
    border: 1.5px solid #f3f3e7;
}

.charts-flex {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: stretch;
    margin-bottom: 16px;
    margin-left: 16px;
    /* thêm margin trái */
    margin-right: 16px;
    /* thêm margin phải */
}

.analysis-chart-container {
    flex: 1 1 320px;
    min-width: 280px;
    padding: 24px 24px 0 24px;
    background: rgba(254, 250, 224, 0.92);
    border-radius: 18px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px 0 rgba(177, 171, 134, 0.08);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: 8px;
    /* thêm margin trên */
    margin-bottom: 24px;
    /* giữ margin dưới */
}

.chart-title {
    font-weight: 700;
    color: #0A400C;
    font-size: 1.08rem;
    margin-bottom: 10px;
    letter-spacing: 0.01em;
}

.analysis-list {
    padding: 0 16px 32px 16px;
}

.analysis-card-new .w-14.h-14 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    min-width: 56px;
    min-height: 56px;
    background: #fff6;
    border-radius: 1rem;
    border: 2px solid #B1AB86;
    box-shadow: 0 2px 8px 0 rgba(177, 171, 134, 0.10);
    margin: 0 !important;
    padding: 0;
}

.analysis-card-new .w-14.h-14 span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    margin: 0;
}

.search-icon-gap {
    display: flex;
    align-items: center;
    margin-right: 5px;
}

/* Slide-over styles */
.slide-over-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
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
    justify-content: space-between;
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

.slide-over-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}

.slide-over-close:hover {
    background: rgba(177, 171, 134, 0.1);
}

.slide-over-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
}

@keyframes slideInFromRight {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

/* Responsive */
@media (max-width: 900px) {
    .charts-flex {
        flex-direction: column;
        gap: 0;
    }

    .analysis-chart-container {
        margin-bottom: 16px;
    }
}

@media (max-width: 640px) {
    .analysis-chart-container {
        padding: 16px 8px 0 8px;
    }

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