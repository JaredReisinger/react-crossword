## [2.2.1](https://github.com/JaredReisinger/react-crossword/compare/v2.2.0...v2.2.1) (2020-06-02)


### Bug Fixes

* fix 'correct' class on correct crossword ([794f3b1](https://github.com/JaredReisinger/react-crossword/commit/794f3b1d75c1f3d2e75f30491edc87da9b9a3fc8))

# [2.2.0](https://github.com/JaredReisinger/react-crossword/compare/v2.1.0...v2.2.0) (2020-06-02)


### Features

* add 'onCrosswordCorrect' callback ([f0e9d1f](https://github.com/JaredReisinger/react-crossword/commit/f0e9d1f2b93392637d8e1a061cb04f6e4535b587)), closes [#20](https://github.com/JaredReisinger/react-crossword/issues/20) [#20](https://github.com/JaredReisinger/react-crossword/issues/20)

# [2.1.0](https://github.com/JaredReisinger/react-crossword/compare/v2.0.0...v2.1.0) (2020-05-27)


### Features

* add onCellChange callback and 'correct' classname on clues ([6fd2539](https://github.com/JaredReisinger/react-crossword/commit/6fd2539cf8a2cc885530ebf9669e8b14d8f53f68)), closes [#20](https://github.com/JaredReisinger/react-crossword/issues/20) [#21](https://github.com/JaredReisinger/react-crossword/issues/21) [#21](https://github.com/JaredReisinger/react-crossword/issues/21)

# [2.0.0](https://github.com/JaredReisinger/react-crossword/compare/v1.0.5...v2.0.0) (2020-05-21)


### Bug Fixes

* avoid calling onLoadedCorrect if there are no correct answers ([a3e89f5](https://github.com/JaredReisinger/react-crossword/commit/a3e89f501c772f3c1b0439a6201d426e6d44dc2a))
* upgrade react-scripts from 3.4.0 to 3.4.1 ([10fb7cf](https://github.com/JaredReisinger/react-crossword/commit/10fb7cfca0c0f9b17666f9e01a3e982746f66e57))


### Code Refactoring

* **hooks:** re-implement using React hooks ([e123d25](https://github.com/JaredReisinger/react-crossword/commit/e123d25bc72e35f82c3c1bdbd15ef84e469bef3f))


### improvement

* **theming:** switch to use ThemeProvider for styling ([75cb12c](https://github.com/JaredReisinger/react-crossword/commit/75cb12cc97096a1210359effa5c4438be796669e))


### BREAKING CHANGES

* **theming:** Styling properties moved into `theme` property (or consumed from ThemeProvider).
* **hooks:** Switched to React hooks, and thus using React.forwardRef() on Crossword to expose
imperative commands (reset(), focus(), fillAllAnswers()).

## [1.0.5](https://github.com/JaredReisinger/react-crossword/compare/v1.0.4...v1.0.5) (2020-03-17)


### Bug Fixes

* **vulnerabilities:** update dependencies ([5c08901](https://github.com/JaredReisinger/react-crossword/commit/5c08901c913490a3ea2e347a6be83882624d3134))

## [1.0.4](https://github.com/JaredReisinger/react-crossword/compare/v1.0.3...v1.0.4) (2020-03-09)


### Bug Fixes

* reduce size ([f3f3050](https://github.com/JaredReisinger/react-crossword/commit/f3f3050a6639038aac69c60d8080ba6550ea93e8)), closes [#16](https://github.com/JaredReisinger/react-crossword/issues/16)

## [1.0.3](https://github.com/JaredReisinger/react-crossword/compare/v1.0.2...v1.0.3) (2020-03-03)


### Bug Fixes

* improve doc commenting, force release with improved testing ([ff6957d](https://github.com/JaredReisinger/react-crossword/commit/ff6957db4e18db7058beacfa628b946b00a5ba6e))

## [1.0.2](https://github.com/JaredReisinger/react-crossword/compare/v1.0.1...v1.0.2) (2020-02-28)


### Bug Fixes

* set minimum node version to 10.18 ([22f7167](https://github.com/JaredReisinger/react-crossword/commit/22f71679595b0bca94a5dfb42168afa43e74c8d9))

## [1.0.1](https://github.com/JaredReisinger/react-crossword/compare/v1.0.0...v1.0.1) (2020-02-21)


### Bug Fixes

* **package:** update react-scripts to version 3.4.0 ([aa0744b](https://github.com/JaredReisinger/react-crossword/commit/aa0744b506fb656204016d5776a18f5f424e1e4a)), closes [#6](https://github.com/JaredReisinger/react-crossword/issues/6)

# 1.0.0 (2020-01-20)


### Bug Fixes

* **proptypes:** fix proptypes definition of across/down data ([ae8b19a](https://github.com/JaredReisinger/react-crossword/commit/ae8b19aa6d08154162dfea57e41a11a2da2ddc85))


### Features

* tweaks and adjustment for preliminary release ([0c3e4a7](https://github.com/JaredReisinger/react-crossword/commit/0c3e4a7a4bbed140cc7524150b7d86c1ff507a6a))
* **initial:** initial copy of sources from proof-of-concept ([31b73ec](https://github.com/JaredReisinger/react-crossword/commit/31b73ecccf57b5b31a90d62ed7ba6ab975187ff9))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
