# Contributing to react-crossword

:+1::tada: First off, thank you for taking the time to contribute! :tada::+1:

The following is a set of guidelines and expectations for contributing to react-crossword. Note that these are _guidelines_, not set-in-stone rules. Use your best judgment, and also feel free to propose changes to this document itself in a code request, or by opening an issue.

#### Table of contents

<!-- TOC depthfrom:2 depthto:3 orderedlist:false updateonsave:true -->

- [Code of conduct](#code-of-conduct)
- [I just have a question!](#i-just-have-a-question)
- [How can I contribute?](#how-can-i-contribute)
  - [Reporting bugs](#reporting-bugs)
  - [Suggesting enhancements](#suggesting-enhancements)
  - [Pull requests](#pull-requests)

<!-- /TOC -->

## Code of conduct

This project and everyone participating in it is goverened by the [code of conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## I just have a question!

If you have a question, or found what looks like a bug, please feel free to [open a new GitHub issue](https://github.com/JaredReisinger/react-crossword/issues?q=is%3Aissue) for it. Even better, check to see if there's already been an issue that addresses the question first.

## How can I contribute?

### Reporting bugs

If you've run across what feels like a bug, first [check to see if there's already an open issue](https://github.com/JaredReisinger/react-crossword/issues) about it. If there is, you can add any additional details you think would helpful in tracking down the issue. If there is a **closed** issue that seems to be the same thing that you're seeing, please create a new issue and reference the old one rather than re-opening the closed issue.

When describing the bug, please be as detailed as possible:

- **Use a clear and descriptive title** to help identify the problem.
- **Include the version number of react-crossword** that you're using.
- **Provide a description or exceprt of the code** if you can.
- **Include the error message** if there was one.
- **Include a screenshot or animated GIF** if it's a rendering issue.

### Suggesting enhancements

Much as with bugs, please first [check to see if there's already an open issue](https://github.com/JaredReisinger/react-crossword/issues) that describes the enhancement you'd like to see. If there is, you can add any additional specifics that would help the enhancement meet your use case.

When suggesting a new enhancement, please be as detailed as possible:

- **Use a clear and descriptive title** to help identify the suggestion.
- **Provide a description of the problem you're trying to solve** rather than simply suggesting the solution outright. In some cases, there might be a different approach altogether that actually fulfills your needs more directly.
- **Explain why this problem might be of general interest** and not an isolated one-off solution to your specific problem. (If you feel it's more of a one-off situation, you should still feel free to open an issue so we can discuss possible solutions!)
- **Include the version number of react-crossword** that you're using.

### Pull requests

I'm a big fan of automating as much as possible; this means that where other projects might have prescriptive style guides you need to follow, most of react-crossword's requirements are automatically applied by tooling. Between `.editorconfig`, `.prettierrc.yaml`, `.stylelintrc.yaml`, `.eslintrc.yaml` and `.commitlint.yaml`, you are practically _forced_ into using the project's standard style. Most of the time, your editor (VSCode, Atom, etc.) will simply take care of this for you, and you won't even need to think about it. If you have any concerns, you can run the following commands before commiting:

```shell
npm run test
npm run lint
npm run stylelint
```

Your commit message should follow the [Conventional Commits](https://www.conventionalcommits.org) standard. There's tooling for this, too:

```shell
npm run commit
```

will run an interactive command-line that helps you create the correct format for the commit message. (But honestly, if the commit message isn't in the "standard" form, don't worry about it too much... I can adjust the PR to ensure that the right things happen.)
