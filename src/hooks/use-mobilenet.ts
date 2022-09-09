import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useMobilenet = () => {
    const modelRef = useRef<mobilenet.MobileNet | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        tf.ready().then(() => {
            mobilenet.load()
                .then((model) => {
                    modelRef.current = model
                    console.log('model loaded')
                })
                .catch(() => {
                    console.log('model error')
                })
                .finally(() => setIsLoading(false))
        })
        .catch(() => {
            console.log('model error')
        })
    },[])

    const predictImageContent = useCallback(async (img: HTMLImageElement) => {
        setIsLoading(true)
        const data = await modelRef.current?.classify(img)
        setIsLoading(false)
        return data;
    },[setIsLoading])

    return {isLoading, predictImageContent}
}
