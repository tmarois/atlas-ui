<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <!-- Dark Mode Toggle -->
        <button
            @click="toggleDarkMode"
            class="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
            <span v-if="isDarkMode">🌞</span>
            <span v-else>🌙</span>
        </button>
        <div class="h-screen">
            <component :is="activeComponent.component" />
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import AppLayoutTest from './components/tests/AppLayoutTest.vue';

    const components = [
        {
            name: 'App Layout',
            component: AppLayoutTest,
            description: 'Test the App layout component with different configurations, dark mode, and sizing options.'
        },
    ];

    const activeComponent = ref(components[0]);

    const isDarkMode = ref(false);

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
        if (isDarkMode.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Store preference in localStorage
        localStorage.setItem('atlas-ui-dark-mode', isDarkMode.value ? 'dark' : 'light');
    };

    onMounted(() => {
        const savedMode = localStorage.getItem('atlas-ui-dark-mode');
        if (savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            isDarkMode.value = true;
            document.documentElement.classList.add('dark');
        }
    });
</script>
