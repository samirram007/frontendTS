//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'


export default {
    ...tanstackConfig,
    rules: {
        'no-console': 'warn',
        'react/react-in-jsx-scope': 'off',
    },
}