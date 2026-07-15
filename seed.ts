import { db } from "./index";
import { categories, products, reviews } from "./schema";

export async function seed() {
  // Check if already seeded
  const existing = await db.select().from(categories).limit(1);
  if (existing.length > 0) return { message: "Already seeded" };

  const cats = await db.insert(categories).values([
    {
      name: "Graffiti Art",
      slug: "graffiti-art",
      description: "Bold urban street art transformed into gallery-worthy masterpieces. Raw energy meets refined technique.",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNvn-FNYUIeFPk7YzcBzNWZQKsa4o5uqc6Qyp2NA60i8iNqM2PYCTeEGNnplNq-F5RL54UBm_s63-snZ4a9t2j_sOCPmg34kH4c4C_i985D3HwxYqi2=w940",
    },
    {
      name: "Abstract Expressionism",
      slug: "abstract-expressionism",
      description: "Vibrant abstract paintings that challenge perception and ignite emotion through color and form.",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczPdMHzI5wZGGX3vXEemEwVqjVj6BhIgzS1VLqA1SpDuMKCxwBQmTJop3EJlqVAMNwD2DrB6_DiIdjFxp7Nq3odrLSJ71MMTjSEM1pr4tOHhHEOtq953=w940",
    },
    {
      name: "Mixed Media",
      slug: "mixed-media",
      description: "Collage, texture, and layered techniques creating multidimensional visual experiences.",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczMMP5yZmxuwOTuoHLTp7EMNe-nxDhB_SXzSb45_p6W7KiKLlGz59JGYWReV109r3deoIXS1yrk0THDIRWuaiapIzYBH0-IFiL-IKGJur_v8a6g4YJXb=w940",
    },
    {
      name: "Limited Edition Prints",
      slug: "limited-edition-prints",
      description: "Numbered, signed prints from our most sought-after collections. Museum-quality on archival paper.",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczPBvnzDFnYcTmfpYkh1tCYzhMluNG9kJtrQZwk3PqtJFLeFf9Pswq8jT14-1gDSJyyQu4JnTYDH4hyci9IesM1aLkvzkI2XrHU6ShH1bxZPCNRby-7y=w940",
    },
    {
      name: "Urban Portraits",
      slug: "urban-portraits",
      description: "Stylized portraiture infused with street culture, graffiti elements, and raw urban energy.",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczN_Yb0eB43lEKEHAlXZ0xCJtdbm2hR3wWB4_7vZi1EblrBXb825c-NJqFcYK3ZVGnk-nTByFU1wxO4qfkZ_LErkTDg-u5suyj3lEmDlBi1_RhyAITtf=w940",
    },
  ]).returning();

  const prods = await db.insert(products).values([
    {
      name: "Neon Rebellion", slug: "neon-rebellion",
      description: "A explosive fusion of neon pinks, electric blues, and volcanic oranges erupting across the canvas. This piece captures the raw defiance of underground street culture, each spray stroke a battle cry against the mundane.",
      price: "2400.00", originalPrice: "2800.00", categoryId: cats[0].id,
      medium: "Spray paint & acrylic on canvas", dimensions: "48 × 36 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczOVs4vsVNH40Cwbo2Kugv33NEj5P4A6U9cVCNd9UMhIKjiBzYnP0XafaejWMhAszHYaMJOp5686xeajJc9uVVfw1GGeiHX86ZBHT8LL1BH3ER5zmHTl=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczOVs4vsVNH40Cwbo2Kugv33NEj5P4A6U9cVCNd9UMhIKjiBzYnP0XafaejWMhAszHYaMJOp5686xeajJc9uVVfw1GGeiHX86ZBHT8LL1BH3ER5zmHTl=w940","https://lh3.googleusercontent.com/pw/AP1GczMJ_f_rKGS6fiqP97y3tjByH_EwHDNkdTUiIDS0SDeUTgHjMdoQ5vi1bMc_OwVjM6aQciP1FZB5vv0iSdQGvAa61VQJy1gbQpMdu78q2gzAzCbtmNo4=w940","https://lh3.googleusercontent.com/pw/AP1GczM7gXSPSH7vkKZF_hOFYtLU3zW5OxOrc2H7SRRLtP449MSy1LQlH_KxLliGVB82QeR6mNqfXcRYkBnkRTnWYsdnv7_cfuIjlbhcaBcBgxcAg-gbX97_=w940"],
      featured: true, inStock: true,
    },
    {
      name: "Urban Decay No. 7", slug: "urban-decay-no-7",
      description: "Peeling layers of city life captured in melancholic beauty. Weathered textures of brick and concrete mingle with ghostly tags that fade like memories.",
      price: "1850.00", categoryId: cats[0].id,
      medium: "Mixed spray paint & found objects on wood panel", dimensions: "36 × 24 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczM7gXSPSH7vkKZF_hOFYtLU3zW5OxOrc2H7SRRLtP449MSy1LQlH_KxLliGVB82QeR6mNqfXcRYkBnkRTnWYsdnv7_cfuIjlbhcaBcBgxcAg-gbX97_=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczM7gXSPSH7vkKZF_hOFYtLU3zW5OxOrc2H7SRRLtP449MSy1LQlH_KxLliGVB82QeR6mNqfXcRYkBnkRTnWYsdnv7_cfuIjlbhcaBcBgxcAg-gbX97_=w940","https://lh3.googleusercontent.com/pw/AP1GczOkCe8GRSswvNyTMb4GwT12j22eFWPxnLLKLhwbyeBgxWZVFg8Y5-lWRrN4LdFSjayLbSTmvltSLptrif8fZRLHoOKIv5uYucQ6F4at8aLdlI_oIclv=w940","https://lh3.googleusercontent.com/pw/AP1GczNfFfgdS9wu_-dVShIN3YBO_21ZGD1028zzgnLr_oOjl1s7CsRbLcvMgiE0IkP_aIDAz3E7F0SxtlCuOxqIWWZHHHvwEDesqHNgz_mzN6ii8p5ca12Q=w940"],
      featured: false, inStock: true,
    },
    {
      name: "Concrete Dreams", slug: "concrete-dreams",
      description: "Where brutalist architecture meets surrealist imagination. Towering concrete forms dissolve into clouds of luminous spray paint, creating a dreamscape where the city breathes and morphs.",
      price: "3200.00", categoryId: cats[0].id,
      medium: "Spray paint, acrylic & resin on canvas", dimensions: "60 × 48 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczMI-3DZfSsGqEAm0AF7OPc2yHHGlHmV2aSELu9VsseKCKBWGmQ3mQtwA7VVHdGjpiMfNP19rn5Mm9Fg53qE7huoC9_FVViNDe4agpjcN8I4nb3lg274=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczMI-3DZfSsGqEAm0AF7OPc2yHHGlHmV2aSELu9VsseKCKBWGmQ3mQtwA7VVHdGjpiMfNP19rn5Mm9Fg53qE7huoC9_FVViNDe4agpjcN8I4nb3lg274=w940","https://lh3.googleusercontent.com/pw/AP1GczM4c5IPj6496fUThfXJCpLYPCpiNSJ1NeCCpzwUnj4pIz9QDvt52v1pmUdwdnrd4rTjuvkiDplJErvfHj9YIYGxthWC3GfG_LN9dFr94UGyU-VTS4jU=w940","https://lh3.googleusercontent.com/pw/AP1GczNvn-FNYUIeFPk7YzcBzNWZQKsa4o5uqc6Qyp2NA60i8iNqM2PYCTeEGNnplNq-F5RL54UBm_s63-snZ4a9t2j_sOCPmg34kH4c4C_i985D3HwxYqi2=w940"],
      featured: true, inStock: true,
    },
    {
      name: "Chromatic Storm", slug: "chromatic-storm",
      description: "A symphony of color cascading across the canvas like a storm of pure emotion. Bold reds crash against deep indigos while threads of gold weave through the chaos like lightning frozen mid-strike.",
      price: "4500.00", categoryId: cats[1].id,
      medium: "Oil & acrylic on canvas", dimensions: "72 × 48 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczP6uEZoXa_z_m0pi87sNQvBcZlLsHm-Mdvy4_mrpfUYtriHdcF0oAbe2F7uRCJ-1YvYOazKSSzgUqjWSY1VC_OLR-Yo7WW3Vt7BFWPkoMCdb-tAiSHz=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczP6uEZoXa_z_m0pi87sNQvBcZlLsHm-Mdvy4_mrpfUYtriHdcF0oAbe2F7uRCJ-1YvYOazKSSzgUqjWSY1VC_OLR-Yo7WW3Vt7BFWPkoMCdb-tAiSHz=w940","https://lh3.googleusercontent.com/pw/AP1GczPJoYuwWq_508A_Adz5UBXtBp_RFdj4Pvf-QJsT97HSpCEF9c2akPQRwf1kjDg5Wwh3N3UpVTcawNUrxeg5tDciVsZT1gNbiyFn7CyJcgmryDvV7BI9=w940","https://lh3.googleusercontent.com/pw/AP1GczPdMHzI5wZGGX3vXEemEwVqjVj6BhIgzS1VLqA1SpDuMKCxwBQmTJop3EJlqVAMNwD2DrB6_DiIdjFxp7Nq3odrLSJ71MMTjSEM1pr4tOHhHEOtq953=w940"],
      featured: true, inStock: true,
    },
    {
      name: "Violet Euphoria", slug: "violet-euphoria",
      description: "Dissolve into waves of violet, plum, and amethyst that pulse with an almost audible frequency. This immersive piece pulls you into its depths where subtle textures emerge like constellations in a purple night sky.",
      price: "3800.00", originalPrice: "4200.00", categoryId: cats[1].id,
      medium: "Acrylic & ink on canvas", dimensions: "54 × 40 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczM1ivO6a-p7hm5-gJirOrXnt0VqPzf3CNKnmH75sWifSvbV_k22H3JebKNXp6qps0WcqenlYVcPZPvZSPRxkBPahNFrJfWv6YJ_aI8JVi_Jh6e9wuVi=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczM1ivO6a-p7hm5-gJirOrXnt0VqPzf3CNKnmH75sWifSvbV_k22H3JebKNXp6qps0WcqenlYVcPZPvZSPRxkBPahNFrJfWv6YJ_aI8JVi_Jh6e9wuVi=w940","https://lh3.googleusercontent.com/pw/AP1GczNwPlinLO6_a1SyxOsayVSLLxWOZ2jwuyltikgR4YmPKCTUoSaRqyHLd7GaDkMbvkyukTAa6Kpy2_ZDYUnolb4-TBglRc5VXFtNpUhrEMY74uj6lsai=w940","https://lh3.googleusercontent.com/pw/AP1GczMStJF7CitqsqQJw2V4VkfUM6Rkh0vZczx76ytW6Js3-F2WD8ibIcORmQmmn-2rpFdkaDDE2c9-xiOagfemQj6br8-MHpber5ncRcsB3bj3RaID8-Wn=w940"],
      featured: false, inStock: true,
    },
    {
      name: "Golden Turbulence", slug: "golden-turbulence",
      description: "Molten gold rivers cut through midnight blue landscapes in this commanding work. The interplay between the metallic leaf and deep oceanic blues creates a mesmerizing tension — opulence wrestling with the abyss.",
      price: "5200.00", categoryId: cats[1].id,
      medium: "Oil, gold leaf & resin on canvas", dimensions: "72 × 60 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczPJoYuwWq_508A_Adz5UBXtBp_RFdj4Pvf-QJsT97HSpCEF9c2akPQRwf1kjDg5Wwh3N3UpVTcawNUrxeg5tDciVsZT1gNbiyFn7CyJcgmryDvV7BI9=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczPJoYuwWq_508A_Adz5UBXtBp_RFdj4Pvf-QJsT97HSpCEF9c2akPQRwf1kjDg5Wwh3N3UpVTcawNUrxeg5tDciVsZT1gNbiyFn7CyJcgmryDvV7BI9=w940","https://lh3.googleusercontent.com/pw/AP1GczO0_KRMsnDy8bUxhNqKdBrU1EdxI0k_SbgCbrtrLccNRvszKiDtaN3Zjy2rMZvK2ThmoK5NeWyHDYV0ZHuZgPm5GfAE6fOGCsYPEvV1SVZ2bsziRmgg=w940","https://lh3.googleusercontent.com/pw/AP1GczOXL8AwPtDRRu7RuqXl7_SC2l_dNSIOOU8hZstCUVsED4pjyKWygrauPrWIBUijMV2joF6801KvbXTnVheg_e6XRdCzHeN6qiaAZjxQX7Zoama07mGU=w940"],
      featured: true, inStock: true,
    },
    {
      name: "Fragmented Identity", slug: "fragmented-identity",
      description: "Torn posters, splintered reflections, and overlapping silhouettes collide in this provocative exploration of self in the digital age. Layers of wheat-pasted paper and bold paint strokes create a tactile surface.",
      price: "2100.00", categoryId: cats[2].id,
      medium: "Collage, spray paint & acrylic on panel", dimensions: "40 × 30 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNg7IVtpmQBYm217OsEGl-_l1fBlxEJFpAw2qda77WvqdzluklQVquHYqbnHYX9p3RfVKcgHsxH6rD5EPGCrrmBsnJBvHQjERfjVkAm6BFYh6R2U3GU=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczNg7IVtpmQBYm217OsEGl-_l1fBlxEJFpAw2qda77WvqdzluklQVquHYqbnHYX9p3RfVKcgHsxH6rD5EPGCrrmBsnJBvHQjERfjVkAm6BFYh6R2U3GU=w940","https://lh3.googleusercontent.com/pw/AP1GczNis5E3-w3RJ5NBJWC0F4XIMnqZZi0ilPsBwrnzKwnB4tJNNSU_gEBbIYdJ7G6i7cZJTEGSvTzX2jWsNLH3ATNxb8aMPioJ9hQ_V5a4zuLnH-21Yj4I=w940","https://lh3.googleusercontent.com/pw/AP1GczNpe0WuuchJ8tmvDDzN8AkjJRqtSHSDpLow_YGhRN6z2iiAjY7845YcT60llvlldOW2Q8RyB2f4nATR3vOA9WP1c0VSGnz5wfAC2swScgUzhboW8ZXz=w940"],
      featured: false, inStock: true,
    },
    {
      name: "Layered Memories", slug: "layered-memories",
      description: "Vintage photographs, handwritten letters, and urban textures are pressed between translucent layers of resin and pigment. Each stratum tells a story — some clear, some obscured — like memories surfacing and submerging.",
      price: "1950.00", categoryId: cats[2].id,
      medium: "Found objects, paper & resin on board", dimensions: "36 × 36 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczMm9L8eLzoL3Lv1NFz7Mx7kpRj6JTK7hxNZKKuYqRnxL9twZCIMZR3F-yRGKgYCRVV4YHYmEg5keO56qTlp47qa3wd-ujPC0MURESSFMPJZWPHxm3dl=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczMm9L8eLzoL3Lv1NFz7Mx7kpRj6JTK7hxNZKKuYqRnxL9twZCIMZR3F-yRGKgYCRVV4YHYmEg5keO56qTlp47qa3wd-ujPC0MURESSFMPJZWPHxm3dl=w940","https://lh3.googleusercontent.com/pw/AP1GczNCwyJwVTZzNolXrpTDbf1KtdYgrl2ypploI0Au3RVBl2rtZbs1yQiBMYUwic9Ub08Eru-gycOfiOZdyJQ6XGQlQyqcBXHkvZbaxQ-XayouYolVPkoV=w940","https://lh3.googleusercontent.com/pw/AP1GczNde0etGAdhtSwV7jzQqRTkyIBcTpt5DdJuOKI8fJLRyOwHHcA7lmgYT9tAwW5rHU-4Kq5Vd9dLMlpNjxNUPlZODQXBtPdIIBGbq5NLOhNo-XZWHoaA=w940"],
      featured: false, inStock: true,
    },
    {
      name: "Urban Fragments", slug: "urban-fragments",
      description: "A mosaic of city life reassembled in unexpected ways. Ticket stubs, paint chips, torn maps, and graffiti scraps compose a vibrant urban kaleidoscope.",
      price: "2800.00", originalPrice: "3100.00", categoryId: cats[2].id,
      medium: "Mixed media assemblage on wood", dimensions: "48 × 36 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNPKStK4pEENdXdH54hEAa631Tdz2wNQEnjHn5dp-Org1JfJKN_6YhB5Q-yeN0mKkDzCxAob_VzWCUTHkbcWLKxdfUameCtxlroh-R0J_iHAlCD8Pi2=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczNPKStK4pEENdXdH54hEAa631Tdz2wNQEnjHn5dp-Org1JfJKN_6YhB5Q-yeN0mKkDzCxAob_VzWCUTHkbcWLKxdfUameCtxlroh-R0J_iHAlCD8Pi2=w940","https://lh3.googleusercontent.com/pw/AP1GczMaXg0yW8v5WvgjCWGvhXXPIsDuG0Kt_Rm4ZZf0soYSHUtmzQRValpCezUiUtXcSiODb5XC_vX1gMl70HaqE9MjjFcem1QLGCF41kyYeS5HIEsmVim_=w940","https://lh3.googleusercontent.com/pw/AP1GczMeChnP1L1VEMNJN0B8Thj7K1zMy6Bk3zqIXIehQRra0kGh28UfI08R1aw_5io43aL__DX13R9qaqBD-2FrdxvsI1Z8jO_OgIiHl2TVlrHFCOBKAw4n=w940"],
      featured: false, inStock: true,
    },
    {
      name: "Midnight Bloom Print", slug: "midnight-bloom-print",
      description: "A numbered giclée print capturing the ethereal beauty of flowers blooming in moonlight. Deep navy backgrounds make the luminous petals glow as if lit from within. Printed on 310gsm Hahnemühle archival paper.",
      price: "450.00", categoryId: cats[3].id,
      medium: "Giclée print on archival paper", dimensions: "24 × 18 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczPBvnzDFnYcTmfpYkh1tCYzhMluNG9kJtrQZwk3PqtJFLeFf9Pswq8jT14-1gDSJyyQu4JnTYDH4hyci9IesM1aLkvzkI2XrHU6ShH1bxZPCNRby-7y=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczPBvnzDFnYcTmfpYkh1tCYzhMluNG9kJtrQZwk3PqtJFLeFf9Pswq8jT14-1gDSJyyQu4JnTYDH4hyci9IesM1aLkvzkI2XrHU6ShH1bxZPCNRby-7y=w940","https://lh3.googleusercontent.com/pw/AP1GczMWM6r6sVinWDFAhjGJem_kSOUA7MB-CEO2aX-j8v8BzBjEAOyv9eghls82rjwFztxDxHHoyNKJEY5LngQmx1C04wA-I-xi9b5TLMa39Y6Iqbfh-Oj6=w940","https://lh3.googleusercontent.com/pw/AP1GczOPIpDnR64rkxsDrMdIdJ1YsDL6v830pJjJa2gixolsJlBi09K_bD7z2DZXByp9dqhkhkLEGyGAi1LHQKJb1A5Z0djR9ntWnwyG5ar42U0T2FuMeGGf=w940"],
      featured: true, inStock: true,
    },
    {
      name: "Electric Dusk Print", slug: "electric-dusk-print",
      description: "When the sky electrifies at dusk and the city becomes a circuit board of light. This print captures that magical transition when day surrenders to neon night. Limited to just 50 editions.",
      price: "380.00", categoryId: cats[3].id,
      medium: "Giclée print on archival paper", dimensions: "20 × 16 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczNv3PYZRSjGDMzm0BQj0tJAvBJHbFnrDaUxGcC9ldCvcqnNho2sMqha-iPfZmpV5GFQ6af17p9On_iN3HJljBBSI12fXnBpfptRzaXPVagYq2iKzDVQ=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczNv3PYZRSjGDMzm0BQj0tJAvBJHbFnrDaUxGcC9ldCvcqnNho2sMqha-iPfZmpV5GFQ6af17p9On_iN3HJljBBSI12fXnBpfptRzaXPVagYq2iKzDVQ=w940","https://lh3.googleusercontent.com/pw/AP1GczMdG9i-ZUUnc0fc65x3cElxgdW1WhhQ-KZu8nMfKlxLqVm7YSvjIImk1qV-1YEabQiY86Nux8yb8r4Ovfwd_2TW7WsKxq9v2pzVhdRIPLDnQEwr0oOg=w940","https://lh3.googleusercontent.com/pw/AP1GczOcd3S-XTcCO2KqsCPoNHy6RcK67pQDbUvbXkGkZq5_DzREwBfs1IFFSnXF5-e2IELRcgBFpdqK6jEHAi4gaOBh2dHDLvxm3cRR2gijxZLYSTA-m0DE=w940"],
      featured: false, inStock: true,
    },
    {
      name: "Silent Echoes Print", slug: "silent-echoes-print",
      description: "Whisper-soft tones of silver and sage compose this meditative print. Like soundwaves frozen in space, concentric forms ripple outward in perfect harmony. Edition of 75, hand-finished with metallic accents.",
      price: "520.00", originalPrice: "600.00", categoryId: cats[3].id,
      medium: "Giclée print with hand-finished metallic accents", dimensions: "30 × 22 in",
      imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczOCKd-6DeuWFKzPmOG5thmhKHrfcm3Dp3ilIlpjecTYk4ok4kRrACUUYcvGKi7tqKmB9G5Yn8gVngza4orqyvTs82YVLpgb_SI5764EU57egVJ3m_Np=w940",
      images: ["https://lh3.googleusercontent.com/pw/AP1GczOCKd-6DeuWFKzPmOG5thmhKHrfcm3Dp3ilIlpjecTYk4ok4kRrACUUYcvGKi7tqKmB9G5Yn8gVngza4orqyvTs82YVLpgb_SI5764EU57egVJ3m_Np=w940","https://lh3.googleusercontent.com/pw/AP1GczOIy_KkxB5bYZcO3fUUBS9QI9AzKaxvhxB1wMTQclsPFhU6k6zPI9_7sRuqa9M2ws4DB98adELpQ9TYVJ9H4XAttVvb-QM0zTNOdqqadMw3OahUJJDd=w940","https://lh3.googleusercontent.com/pw/AP1GczOrczPOk8hhk0ebSfr0YMhCRkp1LoOSJo0ZAOAVVzFmLYKjItSVxPtjopNJuA9HcrBpTH7HNWiYzI9wInKew30d-A7GimP6ocdajuQR-FrY_sooxO85=w940"],
      featured: false, inStock: true,
    },
  ]).returning();

  await db.insert(reviews).values([
    { productId: prods[0].id, authorName: "Marcus Chen", rating: 5, comment: "Absolutely stunning piece. The colors are even more vibrant in person. It has become the centerpiece of my living room." },
    { productId: prods[0].id, authorName: "Elena Voss", rating: 4, comment: "Beautiful work with incredible depth. The layering technique is masterful." },
    { productId: prods[1].id, authorName: "Sarah Mitchell", rating: 5, comment: "The texture on this piece is extraordinary. You can feel the story of the city in every brushstroke." },
    { productId: prods[2].id, authorName: "Amara Johnson", rating: 5, comment: "Monumental in every sense. This painting commands the room." },
    { productId: prods[3].id, authorName: "Victoria Strand", rating: 5, comment: "One of the most impactful pieces I have ever owned. The gold threads through the storm are pure magic." },
    { productId: prods[4].id, authorName: "Lisa Nakamura", rating: 5, comment: "I bought this for my meditation space and it is perfect. The depth of purple is almost hypnotic." },
    { productId: prods[5].id, authorName: "Alexandra Romanov", rating: 5, comment: "The gold leaf work is absolutely breathtaking. Under natural light, this painting transforms throughout the day." },
    { productId: prods[6].id, authorName: "Jordan Blake", rating: 4, comment: "Thought-provoking and visually striking. A conversation starter." },
    { productId: prods[9].id, authorName: "Sophie Laurent", rating: 5, comment: "The print quality is exceptional — you would swear it was an original." },
    { productId: prods[9].id, authorName: "Kevin OBrien", rating: 5, comment: "Bought this as a gift and now I need one for myself. The glow effect on the petals is magical." },
    { productId: prods[11].id, authorName: "Hannah Morrison", rating: 5, comment: "The metallic accents are hand-finished with such care. This print feels like an original." },
  ]);

  return { message: "Database seeded successfully", categories: cats.length, products: prods.length };
}
