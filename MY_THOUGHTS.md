I'll use this document to write down my thoughts behind the changes in each commit:

### Commit 1: Adding unit tests.
Basic TDD practice; To make sure none of my future changes break the existing functionality, I've added exhaustive unit tests with 100% coverage. With every future change I make, I'll run the tests to make sure everything still works as expected.

### Commit 2: Basic refactor.
I've started the refactoring work with a simplification of the `if...else` blocks and replacing them with `switch` statements whereever it's straight forward. This just makes it easier to read and follow along. The refactor is not done yet, but I will be incrementally commiting working versions to make it easier to debug in case I break something. 
Of course other added benefit is cleaner, more efficeint code. Instead of having to go through a million branches to find the right one, each item is now contained within a single case in each of the `switch` statements. 