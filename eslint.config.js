import antfu from '@antfu/eslint-config'

export default await antfu({
  ignores: ['dist*', 'output', 'cache', 'static', 'public', 'node_modules', '**/*.d.ts', '**/*.md'],
}, {
  rules: {
    'no-unused-vars': 'off',
  },
})
