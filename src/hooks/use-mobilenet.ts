import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useMobilenet = () => {
    const modelRef = useRef<mobilenet.MobileNet | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        tf.ready().then(() => {
            mobilenet.load()
                .then((model) => {
                    modelRef.current = model
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
        try{
            const data = await modelRef.current?.classify(img)
            setIsLoading(false)
            return data;
        } catch {
            setIsLoading(false)
        }
    },[setIsLoading])

    return {isLoading, predictImageContent}
}
