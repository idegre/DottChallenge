import { LoadingErrorContainer } from "../LoadingErrorContainer"
import { Container, Image } from "./styled"

type Props = {
    isLoading?: boolean
    urls?: string[]
    getAlt: (index: number) => string
    getKey: (url: string) => string
}

export const PhotoGallery = ({isLoading, urls, getAlt, getKey}: Props) => {
    return <LoadingErrorContainer isLoading={isLoading}>
        <Container>
            {urls && urls.map((url, index) => <Image key={getKey(url)} height={200} width={200} alt={getAlt(index)} src={url} loading="lazy" />)}
        </Container>
    </LoadingErrorContainer>
}