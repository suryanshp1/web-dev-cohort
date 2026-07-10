import React from 'react'

const DynamicDocsPage = async({params}: {params: Promise<{slug: Array<string>}>}) => {
    const {slug} = await params
    return (
        <div>DynamicDocsPage {typeof slug === 'undefined' ? slug : slug.join('/')}</div>
    )
}

export default DynamicDocsPage