<script>
    import { onMount } from "svelte";
    import { slide, fly } from "svelte/transition";
    import Tailwindcss from "./Tailwindcss.svelte";
    onMount(() => {
        addFrame(0);
        addFrame(0);
        addFrame(1);
        addFrame(0);
    });

    function newFrameListener(node) {
        const createStreamMaybe = (event) => {
            if (event.key === "n" && event.ctrlKey) {
                streams = streams.concat({ id: counter++, frames: [] });
            }
        };
        window.addEventListener("keyup", createStreamMaybe);
        return {
            destroy: () => window.removeEventListener("keyup", createStreamMaybe),
        };
    }

    let counter = 1;
    let streams = [
        { id: counter++, frames: [] },
        { id: counter++, frames: [] },
    ];
    function addFrame(index) {
        streams[index].frames.unshift({ id: counter, command: `RETURN ${counter++}` });
        streams = streams;
    }
    function deleteFrame(streamIndex, frameIndex) {
        streams[streamIndex].frames.splice(frameIndex, 1);
        if (streams[streamIndex].frames.length < 1) {
            streams.splice(streamIndex, 1);
        }
        streams = streams;
    }
</script>

<Tailwindcss />
<main use:newFrameListener class="bg-gray-600 p-0 m-0 h-screen w-full flex flex-row">
    {#each streams as stream, streamIndex (stream.id)}
        <div class="flex flex-col flex-1 overflow-y-auto">
            <div class="m-2 p-3">
                <button class="bg-blue-900 text-gray-100 px-2 py-1 rounded" on:click={() => addFrame(streamIndex)}>Add
                    frame</button>
            </div>
            {#each stream.frames as frame, frameIndex (frame.id)}
                <div
                    in:slide|local
                    out:fly|local={{ x: -800, duration: 300 }}
                    class="rounded bg-gray-800 border-1 border-gray-100 h-48 p-3 m-5 text-white flex-shrink-0">
                    <div class="h-auto bg-gray-700 p-2 w-full flex flex-row">
                        <div class="flex-grow">{frame.command}</div>
                        <div class="flex-grow-0">
                            <button class="border-0" on:click={() => deleteFrame(streamIndex, frameIndex)}>⏏</button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/each}
</main>
