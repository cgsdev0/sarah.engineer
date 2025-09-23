
I'm sure you've heard this phrase from somebody by now:

> I've pretty much replaced search with ChatGPT*.

_(*or Claude, or DeepSeek, or some LLM that pretends to be Danny Devito)_

In this post, I'll tell you why that person is wrong and stupid and dumb (sorry in advance if that person was you)

## But first: what is "search"?

If you're new to the internet, welcome! For the rest of you, you probably already have some concept of what "search" means. That said, I was struggling to put that concept into words, so this will have to do:

!["what is search in internet terms"](google.png)

This was the first definition I found (paraphrased):

> Search refers to the process of using a search engine to find information, web pages, or data on the internet.

That sounds nice, but we can do a little bit of algebra to simplify it

* data is just information
* web pages mostly just contain information
* it's not specific to search engines anymore

So we're left with:
> Search is the process of finding information.

But is this really accurate? If the goal was just to find any information, then I would say LLMs are equally useful to search engines; they both provide lots of information quickly when given a query. So, let's make our definition slightly more specific:
> Search is the process of finding _good_ information.

## What makes information good?

The answer to this question will vary from case to case, but _typically_ I find that information is good when it is **factual**. Subjective information has its uses, too, but I would estimate at least 80% of my searches are to find facts.

Particularly as a programmer, I'm often trying to find information about how to make the computer do a thing, or why the computer has done a thing, and these tend to be the objective type of information.

On the off chance I _do_ want to search for subjective information, LLMs are probably the wrong place to look; they don't think, so they can't form opinions, so you probably don't want to replace that aspect of search with an LLM anyways. I hope.

With that out of the way, let's focus on the process of finding facts.

The process of using an LLM vs. a search engine is very similar:

1. You input your query
2. You read some statements on the screen
3. You decide whether those statements are true or false

If the process is the same, what makes LLMs so much worse for finding facts?

## LLMs remove metadata

The problem with using LLMs for search is that you are presented with a statement, and you have to decide, right then and there: _"chat, is this true?"_

With a search engine, you actually have lots of additional metadata that you can factor into this decision:
* how reputable is this website?
* does the author of the statement seem confident?
* is the information old, and possibly out of date?
* has the information been disputed?
* does another search result corroborate this statement?

Depending on the website, you may even have additional pieces of information:
* did a lot of people 'upvote' this statement?
* are there replies calling this statement incorrect?
* does the author of the statement have a really dumb avatar?

All of this valuable information is stripped away and obfuscated by LLMs, leaving you with no option but to trust that the machine, which is incapable of thought, knows best.

## Separating fact from fiction

Even with search engines, this part is hard. The goal of finding facts on the internet is a challenging and noble pursuit. However, I believe it's a skill that can be practiced and trained.

With LLMs, there's nothing to improve upon. Sure, you could try appending "no lies" and "engage maximum truth mode" to the end of your prompt, but it leaves you in the same situation regardless.

For now, I'm going to stick to search engines, and I think you should too.

