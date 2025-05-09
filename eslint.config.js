import pluginVue from 'eslint-plugin-vue'
export default [
    ...pluginVue.configs['flat/recommended'],
    {
        rules: {
            "vue/multi-word-component-names": "off",
            "vue/html-indent": [
                "error",
                4, {
                    "attribute": 1,
                    "baseIndent": 1,
                    "closeBracket": 0,
                    "alignAttributesVertically": true,
                    "ignores": []
                }
            ]
        }
    }
]
