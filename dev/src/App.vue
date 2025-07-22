<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header class="bg-white dark:bg-gray-800 shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <h1 class="text-xl font-bold">Atlas UI Testing</h1>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <button
                            @click="toggleDarkMode"
                            class="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                        >
                            <span v-if="isDarkMode">🌞 Light Mode</span>
                            <span v-else>🌙 Dark Mode</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
        <div class="">
            <div class="flex">
<!--                <div class="w-64 pr-4">-->
<!--                    <nav class="space-y-1">-->
<!--                        <a-->
<!--                            v-for="(component, index) in components"-->
<!--                            :key="index"-->
<!--                            @click="activeComponent = component"-->
<!--                            class="flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer"-->
<!--                            :class="[-->
<!--                                activeComponent === component-->
<!--                                    ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'-->
<!--                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'-->
<!--                            ]"-->
<!--                        >-->
<!--                            {{ component.name }}-->
<!--                        </a>-->
<!--                    </nav>-->
<!--                </div>-->
                <div class="flex-1">
                    <h2 class="text-2xl font-bold mb-4">{{ activeComponent.name }}</h2>
                    <p class="mb-6 text-gray-600 dark:text-gray-400">{{ activeComponent.description }}</p>
                    <component :is="activeComponent.component" />
                </div>
            </div>
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
