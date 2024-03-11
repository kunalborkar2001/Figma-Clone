import { useMyPresence, useOthers } from "@/liveblocks.config"
import LiveCursors from "./cursor/LiveCursors"
import { useCallback } from "react";


const Live = () => {
    const others = useOthers()
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault()

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x // Substracting position of the cursor relative to the window.
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y // Substracting position of the cursor relative to the window.

        updateMyPresence({ cursor: { x, y } })
    }, [])

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        event.preventDefault()


        updateMyPresence({ cursor: null, message: null })
    }, [])

    const handlePointerDown = useCallback((event: React.PointerEvent) => {

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x // Substracting position of the cursor relative to the window.
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y // Substracting position of the cursor relative to the window.

        updateMyPresence({ cursor: { x, y } })
    }, [])


    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            className="h-screen w-full flex justify-center items-center text-center border-2"
        >
            <h1 className="text-5xl text-white">My name is Kunal </h1>
            
            <LiveCursors others={others} />
        </div>
    )
}

export default Live