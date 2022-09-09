type Props = {url: string}

export const LazyLoadingImage = ({url}: Props) => <img src={url} key={url} alt='dog' loading="lazy" />