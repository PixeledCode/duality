// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
	ignorePatterns: ['apps/**', 'packages/**'],
	parser: '@typescript-eslint/parser',
	rules: {
		'@typescript-eslint/no-empty-interface': 'off',
		'import/no-named-as-default-member': 'off',
	},
}
