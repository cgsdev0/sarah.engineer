
A question I see come up a lot in the Software and Game Development category on Twitch is "why are you not using AI to make the game more quickly?"

This is a broad topic and there's lots of different ways to interpret it, but I'm going to specifically focus on using AI to write code.

I've spent a lot of time thinking about this topic (probably too much); I'm going to put aside any moral / ethical discussion and instead approach this with logic.

## Prompting is Decompression

When you ask a large language model to generate some code, the code almost certainly has more entropy than the prompt. This means generating code can be viewed as *lossy decompression*. Okay, sure, but why does that matter?

It matters because games are designed by making lots of small decisions. A bad designer may not realize they are making these decisions, but a good one certainly should. When you use a model to write code, you are delegating lots of these decisions to the model. Regardless of what you may have included in the prompt (*"You are a senior game designer for the best game studio in the world"*), the model is not thinking critically about all of these micro-decisions within the context of your game. Even if it were, can you really call it your design at that point?

If you are a proponent of generative AI, you might argue with this. "My prompts are high entropy! I still make all of the decisions, just in English." Sure, that's probably possible. However, as someone who has already spent a good chunk of their life learning [formal symbolism](https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD667.html), I'll stick with that for this type of work.

