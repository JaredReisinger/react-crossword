# [4.1.0](https://github.com/JaredReisinger/react-crossword/compare/v4.0.2...v4.1.0) (2022-01-03)


### Features

* add `setGuess(row, col, guess)` imperative ([5cf5110](https://github.com/JaredReisinger/react-crossword/commit/5cf51103e4530574631cc136a8cccb2a6a57992d)), closes [#104](https://github.com/JaredReisinger/react-crossword/issues/104) [#104](https://github.com/JaredReisinger/react-crossword/issues/104)

## [4.0.2](https://github.com/JaredReisinger/react-crossword/compare/v4.0.1...v4.0.2) (2022-01-03)


### Bug Fixes

* update homepage link in package.json to point to new docs location ([f284c63](https://github.com/JaredReisinger/react-crossword/commit/f284c6398b586bb6f860ea65dc0e913600e98764))

## [4.0.1](https://github.com/JaredReisinger/react-crossword/compare/v4.0.0...v4.0.1) (2022-01-03)


### Bug Fixes

* update dev dependencies, force release to update README ([f59241e](https://github.com/JaredReisinger/react-crossword/commit/f59241eb7ab2cd6fb1b240e46f2067c5246e3f99))

# [4.0.0](https://github.com/JaredReisinger/react-crossword/compare/v3.1.0...v4.0.0) (2022-01-03)


### Documentation

* **readme:** fix README, force breaking change ([08d758e](https://github.com/JaredReisinger/react-crossword/commit/08d758e7a506a8e548dcad0eccb9b6858baae043))


### BREAKING CHANGES

* **readme:** The refactoring (a previous commit) was intended to reflect a breaking change...
doing that now.

# [3.1.0](https://github.com/JaredReisinger/react-crossword/compare/v3.0.0...v3.1.0) (2022-01-03)


### Bug Fixes

* **components:** changed DirectionClues to use CrosswordContext ([a3a83ef](https://github.com/JaredReisinger/react-crossword/commit/a3a83efb68bb3677942e4e0471e9e939b6f121d7))
* **tests:** increase test coverage, fix components as needed ([5baf1c4](https://github.com/JaredReisinger/react-crossword/commit/5baf1c458c317f9e760e3c5ad5fae6144695dd11))


### Features

* **components:** begin factoring of logic/rendering ([20589d4](https://github.com/JaredReisinger/react-crossword/commit/20589d4fa23bc2513eb63f8cbce8646f658b2166)), closes [#140](https://github.com/JaredReisinger/react-crossword/issues/140)

# [3.0.0](https://github.com/JaredReisinger/react-crossword/compare/v2.3.1...v3.0.0) (2021-12-31)

### Features

- add classes to Cell for checking per-letter correctness ([df4f2b9](https://github.com/JaredReisinger/react-crossword/commit/df4f2b9375cf79f4d266074e8b0688705177fa11))
- **dependencies:** massive dependency update! ([5cf5083](https://github.com/JaredReisinger/react-crossword/commit/5cf5083d8d56d2ae9e479782982186db6fc5c0d0))
- **typescript:** convert to typescript ([255c54a](https://github.com/JaredReisinger/react-crossword/commit/255c54a9c69c3eaf2e20b9a200a2f89e405a0b8d))

### BREAKING CHANGES

- **typescript:** Converted library to Typescript ~~**and** to ESM module~~ (reverted to CJS for publishing sanity)
- **dependencies:** all dependencies updated, also updated node version minimum

## [2.3.1](https://github.com/JaredReisinger/react-crossword/compare/v2.3.0...v2.3.1) (2020-10-05)

### Bug Fixes

- upgrade @testing-library/user-event from 12.1.5 to 12.1.7 ([f929bf4](https://github.com/JaredReisinger/react-crossword/commit/f929bf4e83e127ce6a40e04f0368c75ddd0827f1))
- upgrade eslint from 7.8.1 to 7.10.0 ([380b452](https://github.com/JaredReisinger/react-crossword/commit/380b45252ecd9ad4b0611ace01bf2df1ce21bf25))
- upgrade eslint-plugin-react from 7.20.6 to 7.21.3 ([ec95fd5](https://github.com/JaredReisinger/react-crossword/commit/ec95fd59ee09e80cbc0fdeb8911cbbaef2533695))
- upgrade rollup from 2.27.1 to 2.28.2 ([f88b4e7](https://github.com/JaredReisinger/react-crossword/commit/f88b4e78b9189e5f3a38f4222456215474655261))
- upgrade snyk from 1.398.1 to 1.406.0 ([c49e8a1](https://github.com/JaredReisinger/react-crossword/commit/c49e8a1b10c640b4969006257ed3b3fe846e63b3))
- upgrade yargs-parser from 20.0.0 to 20.2.1 ([178c081](https://github.com/JaredReisinger/react-crossword/commit/178c08190abd2fe3b61846daa538bdc94e8da688))

# [2.3.0](https://github.com/JaredReisinger/react-crossword/compare/v2.2.12...v2.3.0) (2020-09-29)

### Bug Fixes

- upgrade @testing-library/user-event from 12.1.3 to 12.1.5 ([3e88e81](https://github.com/JaredReisinger/react-crossword/commit/3e88e81ce87153c68cb25c43a0d9c1cb07d74bc8))
- upgrade eslint-plugin-react-hooks from 4.1.0 to 4.1.2 ([1dea653](https://github.com/JaredReisinger/react-crossword/commit/1dea65355eee013c764a99c108fd1e310ec58fdf))
- upgrade lint-staged from 10.2.13 to 10.4.0 ([8600467](https://github.com/JaredReisinger/react-crossword/commit/86004671e5ab18c520b2af90a859e769b0455ed6))
- upgrade multiple dependencies with Snyk ([4c19f26](https://github.com/JaredReisinger/react-crossword/commit/4c19f2651e9a0b64e521b7654769d57b8191087f))
- upgrade prettier from 2.1.0 to 2.1.2 ([334f30f](https://github.com/JaredReisinger/react-crossword/commit/334f30f496140ef68987eb599e67877ba4a1f881))
- upgrade react-styleguidist from 11.0.10 to 11.1.0 ([effaaf5](https://github.com/JaredReisinger/react-crossword/commit/effaaf5edc0238f00b95a0d2d081f6334da31ee8))
- upgrade rollup from 2.26.10 to 2.27.1 ([e7ce16e](https://github.com/JaredReisinger/react-crossword/commit/e7ce16e2194e996dcbca289b740c107a7905fdc8))
- upgrade snyk from 1.389.0 to 1.393.0 ([cce01e8](https://github.com/JaredReisinger/react-crossword/commit/cce01e82627dfc769d199f55ec9a4f26b18793da))
- upgrade snyk from 1.393.0 to 1.398.1 ([1d674b7](https://github.com/JaredReisinger/react-crossword/commit/1d674b799a7f950b5404e77a32bb4a8733f8d6f5))
- upgrade stylelint from 13.6.1 to 13.7.1 ([bbf0298](https://github.com/JaredReisinger/react-crossword/commit/bbf0298ef76fdff934485555fbceba2edbb2e903))

### Features

- upgrade yargs-parser from 19.0.1 to 20.0.0 ([1155112](https://github.com/JaredReisinger/react-crossword/commit/11551129642983446b8b5fe7196507f0c5bf29c5))

## [2.2.12](https://github.com/JaredReisinger/react-crossword/compare/v2.2.11...v2.2.12) (2020-09-08)

### Bug Fixes

- upgrade eslint from 7.7.0 to 7.8.1 ([3f347ad](https://github.com/JaredReisinger/react-crossword/commit/3f347add429e33c3165a17f174c3fcb920d2c7e5))
- upgrade react-styleguidist from 11.0.8 to 11.0.10 ([ff2cbac](https://github.com/JaredReisinger/react-crossword/commit/ff2cbac565b45c2278d449f395dd25db44b7ebff))
- upgrade rollup from 2.26.5 to 2.26.10 ([3d4068f](https://github.com/JaredReisinger/react-crossword/commit/3d4068fe27b9bf394edfc84c94edd303e1c97a03))
- upgrade rollup-plugin-terser from 7.0.0 to 7.0.2 ([1338c86](https://github.com/JaredReisinger/react-crossword/commit/1338c86b9959aa3fc9a8e362f832d42c82f0599d))
- upgrade snyk from 1.384.0 to 1.389.0 ([6f35027](https://github.com/JaredReisinger/react-crossword/commit/6f3502792db4452caffa061475161ccbef33fe3a))
- upgrade styled-components from 5.1.1 to 5.2.0 ([9470709](https://github.com/JaredReisinger/react-crossword/commit/9470709f4845fbe14626a1fd6ed218c8429657d9))

## [2.2.11](https://github.com/JaredReisinger/react-crossword/compare/v2.2.10...v2.2.11) (2020-09-04)

### Bug Fixes

- upgrade @testing-library/user-event from 12.1.2 to 12.1.3 ([d41cb11](https://github.com/JaredReisinger/react-crossword/commit/d41cb115ff437f051263f8ea6cfe27ff6dfa1e7a))
- upgrade commitizen from 4.1.5 to 4.2.1 ([cff2a2f](https://github.com/JaredReisinger/react-crossword/commit/cff2a2fc28509f5562f1824573df7ae2adae26a8))
- upgrade immer from 7.0.7 to 7.0.8 ([43715a9](https://github.com/JaredReisinger/react-crossword/commit/43715a93dcfabc2b2ad98e305bb54edc91a7e61e))
- upgrade lint-staged from 10.2.11 to 10.2.13 ([fe9f2da](https://github.com/JaredReisinger/react-crossword/commit/fe9f2da749612d09e9871d0c1c0d26327fd918e9))
- upgrade prettier from 2.0.5 to 2.1.0 ([221da66](https://github.com/JaredReisinger/react-crossword/commit/221da66461d5712b50c7c3f08aec802b36f5676f))
- upgrade snyk from 1.381.1 to 1.384.0 ([0350352](https://github.com/JaredReisinger/react-crossword/commit/03503524db03562a76180181e4abfef85fe3003e))

## [2.2.10](https://github.com/JaredReisinger/react-crossword/compare/v2.2.9...v2.2.10) (2020-09-04)

### Bug Fixes

- upgrade @testing-library/jest-dom from 5.11.3 to 5.11.4 ([995f1da](https://github.com/JaredReisinger/react-crossword/commit/995f1da56d4068ee683aa644ce846ce72e2d14d3))
- upgrade @testing-library/react from 10.4.8 to 10.4.9 ([836d825](https://github.com/JaredReisinger/react-crossword/commit/836d825175735908dad6e9f2359402d8d1f6e2dc))
- upgrade @testing-library/user-event from 12.1.1 to 12.1.2 ([bf0d283](https://github.com/JaredReisinger/react-crossword/commit/bf0d283edc2a692c21932ad00fb799a26fa5e3a7))
- upgrade jest from 26.4.1 to 26.4.2 ([9159da8](https://github.com/JaredReisinger/react-crossword/commit/9159da88a9266a85b8c03c41003ff392b69ab017))
- upgrade rollup from 2.26.4 to 2.26.5 ([e2ecf6b](https://github.com/JaredReisinger/react-crossword/commit/e2ecf6bec79200b37e41f7079909e626aaf4792c))

## [2.2.9](https://github.com/JaredReisinger/react-crossword/compare/v2.2.8...v2.2.9) (2020-08-24)

### Bug Fixes

- upgrade @babel/core from 7.11.1 to 7.11.4 ([b13c307](https://github.com/JaredReisinger/react-crossword/commit/b13c3075c3a17b1a776febcb4eaa280375b44f39))
- upgrade commitizen from 4.1.2 to 4.1.5 ([4e7ef03](https://github.com/JaredReisinger/react-crossword/commit/4e7ef032878fa1ccf2b03f3448fb4c25173fdd34))
- upgrade jest from 26.4.0 to 26.4.1 ([b885f21](https://github.com/JaredReisinger/react-crossword/commit/b885f21be4994baf63741b0b7957f0484d638ab2))
- upgrade pretty-quick from 2.0.1 to 2.0.2 ([2e82f27](https://github.com/JaredReisinger/react-crossword/commit/2e82f2709913729cf324f52c9a38e1367412e2dc))
- upgrade rollup from 2.26.3 to 2.26.4 ([62a8020](https://github.com/JaredReisinger/react-crossword/commit/62a8020eb2badd7a00ed4d3fcc4dd0df7807cbee))
- upgrade snyk from 1.377.1 to 1.380.0 ([52ab171](https://github.com/JaredReisinger/react-crossword/commit/52ab171a46d14b895180510b966fc71f5f845eb1))
- upgrade snyk from 1.380.0 to 1.381.1 ([a60f850](https://github.com/JaredReisinger/react-crossword/commit/a60f8509baa94a246e28901d028f7e501cb87a88))

## [2.2.8](https://github.com/JaredReisinger/react-crossword/compare/v2.2.7...v2.2.8) (2020-08-20)

### Bug Fixes

- upgrade eslint-plugin-react-hooks from 4.0.8 to 4.1.0 ([b616b87](https://github.com/JaredReisinger/react-crossword/commit/b616b8740f6f98f14e9574c9757ba7212fc25119))
- upgrade rollup from 2.24.0 to 2.26.3 ([bda2920](https://github.com/JaredReisinger/react-crossword/commit/bda2920ca70160d8ed3c93ec9de9a7140670d4bd))
- upgrade snyk from 1.374.0 to 1.377.1 ([f0a6cfc](https://github.com/JaredReisinger/react-crossword/commit/f0a6cfc6564c82d03b6a456e594cc42bdc2a142b))

## [2.2.7](https://github.com/JaredReisinger/react-crossword/compare/v2.2.6...v2.2.7) (2020-08-17)

### Bug Fixes

- example/package.json & example/package-lock.json to reduce vulnerabilities ([eb2d4db](https://github.com/JaredReisinger/react-crossword/commit/eb2d4db8d5c82155c5921fd7d012f46031dc4ea9))

## [2.2.6](https://github.com/JaredReisinger/react-crossword/compare/v2.2.5...v2.2.6) (2020-08-17)

### Bug Fixes

- package.json & package-lock.json to reduce vulnerabilities ([be52987](https://github.com/JaredReisinger/react-crossword/commit/be529870ad8cbc25b5a9965f88aeac3f345aff22))
- upgrade eslint from 7.6.0 to 7.7.0 ([17ff219](https://github.com/JaredReisinger/react-crossword/commit/17ff219143462acc08da66b353716a8826da90bf))
- upgrade rollup from 2.23.1 to 2.24.0 ([aa2f1a9](https://github.com/JaredReisinger/react-crossword/commit/aa2f1a99ca6d36d12bc8a242ef50045c7273ce42))
- upgrade snyk from 1.373.1 to 1.374.0 ([da6744e](https://github.com/JaredReisinger/react-crossword/commit/da6744ec14675b7504c27f1648e1833b537a9f37))

## [2.2.5](https://github.com/JaredReisinger/react-crossword/compare/v2.2.4...v2.2.5) (2020-08-14)

### Bug Fixes

- upgrade eslint-plugin-react from 7.20.5 to 7.20.6 ([b7fdb92](https://github.com/JaredReisinger/react-crossword/commit/b7fdb923341fd2635da8d6aa93a1026750d44cd7))
- upgrade jest from 26.3.0 to 26.4.0 ([18b1e94](https://github.com/JaredReisinger/react-crossword/commit/18b1e949110ed7b5d7909adcd783363ab3940413))

## [2.2.4](https://github.com/JaredReisinger/react-crossword/compare/v2.2.3...v2.2.4) (2020-08-12)

### Bug Fixes

- **dependencies:** upgrade snyk (and kick off new build/release) ([fb86ecd](https://github.com/JaredReisinger/react-crossword/commit/fb86ecd78333e96a07e98935608cee45101dc20f)), closes [#33](https://github.com/JaredReisinger/react-crossword/issues/33)

## [2.2.3](https://github.com/JaredReisinger/react-crossword/compare/v2.2.2...v2.2.3) (2020-08-11)

### Bug Fixes

- package.json, package-lock.json & .snyk to reduce vulnerabilities ([a6d2a37](https://github.com/JaredReisinger/react-crossword/commit/a6d2a37296a6e9f60761c32823f7c3aa638b52f6))

## [2.2.2](https://github.com/JaredReisinger/react-crossword/compare/v2.2.1...v2.2.2) (2020-08-11)

### Bug Fixes

- **dependencies:** move run-time dependencies into regular dependencies ([53f684a](https://github.com/JaredReisinger/react-crossword/commit/53f684ab0ba4e1e799c24965f0932f99bba44758)), closes [#31](https://github.com/JaredReisinger/react-crossword/issues/31)
- **dependencies:** update all dependencies ([9cdbe1e](https://github.com/JaredReisinger/react-crossword/commit/9cdbe1efb1c60d79383a2cac06d487c1224c731e))

## [2.2.1](https://github.com/JaredReisinger/react-crossword/compare/v2.2.0...v2.2.1) (2020-06-02)

### Bug Fixes

- fix 'correct' class on correct crossword ([794f3b1](https://github.com/JaredReisinger/react-crossword/commit/794f3b1d75c1f3d2e75f30491edc87da9b9a3fc8))

# [2.2.0](https://github.com/JaredReisinger/react-crossword/compare/v2.1.0...v2.2.0) (2020-06-02)

### Features

- add 'onCrosswordCorrect' callback ([f0e9d1f](https://github.com/JaredReisinger/react-crossword/commit/f0e9d1f2b93392637d8e1a061cb04f6e4535b587)), closes [#20](https://github.com/JaredReisinger/react-crossword/issues/20) [#20](https://github.com/JaredReisinger/react-crossword/issues/20)

# [2.1.0](https://github.com/JaredReisinger/react-crossword/compare/v2.0.0...v2.1.0) (2020-05-27)

### Features

- add onCellChange callback and 'correct' classname on clues ([6fd2539](https://github.com/JaredReisinger/react-crossword/commit/6fd2539cf8a2cc885530ebf9669e8b14d8f53f68)), closes [#20](https://github.com/JaredReisinger/react-crossword/issues/20) [#21](https://github.com/JaredReisinger/react-crossword/issues/21) [#21](https://github.com/JaredReisinger/react-crossword/issues/21)

# [2.0.0](https://github.com/JaredReisinger/react-crossword/compare/v1.0.5...v2.0.0) (2020-05-21)

### Bug Fixes

- avoid calling onLoadedCorrect if there are no correct answers ([a3e89f5](https://github.com/JaredReisinger/react-crossword/commit/a3e89f501c772f3c1b0439a6201d426e6d44dc2a))
- upgrade react-scripts from 3.4.0 to 3.4.1 ([10fb7cf](https://github.com/JaredReisinger/react-crossword/commit/10fb7cfca0c0f9b17666f9e01a3e982746f66e57))

### Code Refactoring

- **hooks:** re-implement using React hooks ([e123d25](https://github.com/JaredReisinger/react-crossword/commit/e123d25bc72e35f82c3c1bdbd15ef84e469bef3f))

### improvement

- **theming:** switch to use ThemeProvider for styling ([75cb12c](https://github.com/JaredReisinger/react-crossword/commit/75cb12cc97096a1210359effa5c4438be796669e))

### BREAKING CHANGES

- **theming:** Styling properties moved into `theme` property (or consumed from ThemeProvider).
- **hooks:** Switched to React hooks, and thus using React.forwardRef() on Crossword to expose
  imperative commands (reset(), focus(), fillAllAnswers()).

## [1.0.5](https://github.com/JaredReisinger/react-crossword/compare/v1.0.4...v1.0.5) (2020-03-17)

### Bug Fixes

- **vulnerabilities:** update dependencies ([5c08901](https://github.com/JaredReisinger/react-crossword/commit/5c08901c913490a3ea2e347a6be83882624d3134))

## [1.0.4](https://github.com/JaredReisinger/react-crossword/compare/v1.0.3...v1.0.4) (2020-03-09)

### Bug Fixes

- reduce size ([f3f3050](https://github.com/JaredReisinger/react-crossword/commit/f3f3050a6639038aac69c60d8080ba6550ea93e8)), closes [#16](https://github.com/JaredReisinger/react-crossword/issues/16)

## [1.0.3](https://github.com/JaredReisinger/react-crossword/compare/v1.0.2...v1.0.3) (2020-03-03)

### Bug Fixes

- improve doc commenting, force release with improved testing ([ff6957d](https://github.com/JaredReisinger/react-crossword/commit/ff6957db4e18db7058beacfa628b946b00a5ba6e))

## [1.0.2](https://github.com/JaredReisinger/react-crossword/compare/v1.0.1...v1.0.2) (2020-02-28)

### Bug Fixes

- set minimum node version to 10.18 ([22f7167](https://github.com/JaredReisinger/react-crossword/commit/22f71679595b0bca94a5dfb42168afa43e74c8d9))

## [1.0.1](https://github.com/JaredReisinger/react-crossword/compare/v1.0.0...v1.0.1) (2020-02-21)

### Bug Fixes

- **package:** update react-scripts to version 3.4.0 ([aa0744b](https://github.com/JaredReisinger/react-crossword/commit/aa0744b506fb656204016d5776a18f5f424e1e4a)), closes [#6](https://github.com/JaredReisinger/react-crossword/issues/6)

# 1.0.0 (2020-01-20)

### Bug Fixes

- **proptypes:** fix proptypes definition of across/down data ([ae8b19a](https://github.com/JaredReisinger/react-crossword/commit/ae8b19aa6d08154162dfea57e41a11a2da2ddc85))

### Features

- tweaks and adjustment for preliminary release ([0c3e4a7](https://github.com/JaredReisinger/react-crossword/commit/0c3e4a7a4bbed140cc7524150b7d86c1ff507a6a))
- **initial:** initial copy of sources from proof-of-concept ([31b73ec](https://github.com/JaredReisinger/react-crossword/commit/31b73ecccf57b5b31a90d62ed7ba6ab975187ff9))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
