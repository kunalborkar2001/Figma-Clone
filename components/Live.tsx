import { useMyPresence, useOthers } from "@/liveblocks.config"
import LiveCursors from "./cursor/LiveCursors"
import { useCallback, useEffect, useState } from "react";
import CursorChat from "./cursor/CursorChat";
import { CursorMode } from "@/types/type";


const Live = () => {
    const others = useOthers()
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;

    const [cursorState, setCursorState] = useState(({
        mode: CursorMode.Hidden
    }))

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault()

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x // Substracting position of the cursor relative to the window.
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y // Substracting position of the cursor relative to the window.

        updateMyPresence({ cursor: { x, y } })
    }, [])

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        setCursorState({ mod: CursorMode.Hidden })


        updateMyPresence({ cursor: null, message: null })
    }, [])

    const handlePointerDown = useCallback((event: React.PointerEvent) => {

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x // Substracting position of the cursor relative to the window.
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y // Substracting position of the cursor relative to the window.

        updateMyPresence({ cursor: { x, y } })
    }, [])


    useEffect(() => {  // to listen to "/" event
        const onKeyUp = (e: KeyboardEvent) => {
            if(e.key == "/") {
                setCursorState ({
                    mode : CursorMode.Chat,
                    previousMessage : null,
                    message : ''
                })
            }
            else if(e.key === "Escape") {
                updateMyPresence({message : CursorMode.Hidden})
            }
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if(e.key === "/") {
                e.preventDefault()
            }
        }

        window.addEventListener("keyup", onKeyUp)
        window.addEventListener("keydown", onKeyDown)
    },[updateMyPresence])

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            className="h-screen w-full flex justify-center items-center text-center"
        >
            <h1 className="text-5xl text-white">My name is Kunal </h1>

            {cursor && (
                <CursorChat
                    cursor={cursor}
                    cursorState={cursorState}
                    setCursorState={setCursorState}
                    updateMyPresence={updateMyPresence}
                />
            )}


            <LiveCursors others={others} />
        </div>
    )
}

export default Live