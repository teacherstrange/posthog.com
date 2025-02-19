import { CallToAction } from 'components/CallToAction/index.js'
import Contact from 'components/Contact'
import { Title } from 'components/Pricing/PricingTable/Plan'
import { SEO } from 'components/seo'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React, { useEffect, useState } from 'react'

const Editions = ({ setDemoType }) => {
    return (
        <>
            <Intro title="Select edition" />
            <div className="flex justify-center flex-col md:flex-row divide-y-1 md:divide-y-0 md:divide-x-1 divide-dashed divide-gray-accent-light">
                <div className="md:pr-12 pb-12 md:pb-0">
                    <h2 className="text-[15px] font-semibold mb-4 text-gray">Self-serve plans</h2>
                    <div className="flex flex-col space-y-4">
                        <Title title="PostHog Cloud" subtitle="Turnkey solution, pay per event" badge="Self-Serve" />
                        <Title
                            title="Self-Hosted"
                            subtitle="Full access to your instance, pay per event"
                            badge="Self-Serve"
                        />
                        <Title title="Open Source" subtitle="Free, limited to one project" badge="Self hosted" />
                    </div>
                    <CallToAction
                        width="full"
                        className="mt-7 shadow-lg"
                        type="secondary"
                        onClick={() => setDemoType('group')}
                        event={{ name: 'book a demo: clicked group demo' }}
                    >
                        Join a group demo
                    </CallToAction>
                </div>
                <div className="md:pl-12 pt-12 md:pt-0">
                    <h2 className="text-[15px] font-semibold mb-4 text-gray">Enterprise plans</h2>
                    <div className="flex flex-col space-y-10">
                        <div className="space-y-4 max-w-[280px]">
                            <Title
                                title="PostHog Cloud"
                                subtitle="For large userbases or event volumes, starts at $300/mo"
                                badge="Enterprise"
                            />
                            <CallToAction
                                width="full"
                                className="mt-7"
                                type="primary"
                                onClick={() => setDemoType('scale')}
                                event={{ name: 'book a demo: clicked scale demo' }}
                            >
                                Book a personalized demo
                            </CallToAction>
                        </div>
                        <div className="space-y-4 max-w-[280px]">
                            <Title
                                title="Self-Hosted"
                                subtitle="A focus on compliance and security, starts at $450/mo"
                                badge="Enterprise"
                            />
                            <CallToAction
                                width="full"
                                className="mt-7"
                                type="primary"
                                onClick={() => setDemoType('enterprise')}
                                event={{ name: 'book a demo: clicked enterprise demo' }}
                            >
                                Book a personalized demo
                            </CallToAction>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Book = ({ demoType }) => {
    return (
        <>
            <Intro title="Book a demo">
                <Contact hideTabs demoType={demoType} />
            </Intro>
        </>
    )
}

export default function SelfHost() {
    const initialCrumbs = [
        {
            title: 'Select edition',
        },
    ]
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [demoType, setDemoType] = useState(null)
    const [crumbs, setCrumbs] = useState(initialCrumbs)

    useEffect(() => {
        if (demoType) {
            setCrumbs((crumbs) => [
                {
                    title: 'Select edition',
                    onClick: () => setDemoType(null),
                },
                { title: 'Book a demo' },
            ])
        } else {
            setCrumbs(initialCrumbs)
        }
    }, [demoType])
    return (
        <Layout crumbs={[...crumbs]}>
            <SEO title="Select edition - PostHog" />
            <section className="px-4">
                {demoType ? <Book demoType={demoType} /> : <Editions setDemoType={setDemoType} />}
            </section>
        </Layout>
    )
}
