
import { getPolicies } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/section';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ handle: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { handle } = await params;
    const policies = await getPolicies();
    const policy = policies.find((p) => p.handle === handle);

    if (!policy) {
        return {
            title: 'Política no encontrada | Ara Zevallos Studio'
        };
    }

    return {
        title: `${policy.title} | Ara Zevallos Studio`,
        description: `Lea nuestra ${policy.title} para Ara Zevallos Studio.`
    };
}

export default async function PolicyPage({ params }: Props) {
    const { handle } = await params;
    const policies = await getPolicies();
    const policy = policies.find((p) => p.handle === handle);

    if (!policy) {
        notFound();
    }

    return (
        <Section variant="white" padding="lg" container="md">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#3D3D3D]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {policy.title}
            </h1>
            <div
                className="prose prose-pink max-w-none text-[#6B6B6B]"
                dangerouslySetInnerHTML={{ __html: policy.body }}
            />
        </Section>
    );
}
