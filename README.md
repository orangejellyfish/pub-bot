# Slack Bot Example

Based on the [orangejellyfish serverless starter kit][ojssk], these examples of two slackbots are explored in detail in the [building a serverless bot blog][blog].

## Features

Example 1:

API Gateway Slack Hook - A simple bot which echo's back the input you type in Slack.

Example 2:

Lambda Function Slack Hook - A Slack bot which takes a postcode as an input and returns a nearby pub name and address.


## Usage

To deploy a new serverless stack

```sh
npm run deploy
```

Once deployed you can configure a slash command in Slack to call either of these lambda's via their URLs. To set up a slack command see [here][sc].


[ojssk]: https://github.com/orangejellyfish/serverless-starter
[blog]: https://www.orangejellyfish.com/blog/building-a-serverless-slack-bot/
[sc]: https://www.orangejellyfish.com/blog/building-a-serverless-slack-bot/#configuring-the-slash-command-in-slack

