// Default tokens available for each blockchain
// These are the commonly used stablecoins and tokens for payments

export interface Token {
    name: string
    symbol: string
    address: string
    decimals: number
    icon?: string
}

export interface BlockchainTokens {
    name: string
    chainId: number
    tokens: Token[]
}

export const blockchainTokens: Record<string, BlockchainTokens> = {
    BSC: {
        name: "Binance Smart Chain",
        chainId: 56,
        tokens: [
            {
                name: "Tether USD",
                symbol: "USDT",
                address: "0x55d398326f99059fF775485246999027B3197955",
                decimals: 18,
                icon: "💵",
            },
            {
                name: "USD Coin",
                symbol: "USDC",
                address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
                decimals: 18,
                icon: "💲",
            },
            {
                name: "Binance USD",
                symbol: "BUSD",
                address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                decimals: 18,
                icon: "🟡",
            },
            {
                name: "Dai Stablecoin",
                symbol: "DAI",
                address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
                decimals: 18,
                icon: "🔶",
            },
        ],
    },
    Ton: {
        name: "TON Blockchain",
        chainId: -239,
        tokens: [
            {
                name: "Tether USD",
                symbol: "USDT",
                address: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
                decimals: 6,
                icon: "💵",
            },
            {
                name: "Toncoin",
                symbol: "TON",
                address: "native",
                decimals: 9,
                icon: "💎",
            },
        ],
    },
}

// Helper function to get tokens for a specific blockchain
export const getTokensForChain = (chain: string): Token[] => {
    return blockchainTokens[chain]?.tokens || []
}

// Helper function to get default token for a chain (usually USDT)
export const getDefaultToken = (chain: string): Token | undefined => {
    const tokens = getTokensForChain(chain)
    return tokens.find((t) => t.symbol === "USDT") || tokens[0]
}

// Supported chains for the configuration form
export const supportedChains = [
    {
        value: "BSC" as const,
        label: "Binance Smart Chain",
        icon: "🔗",
        description: "Low fees, fast transactions"
    },
    // { 
    //   value: "Ton" as const, 
    //   label: "TON Blockchain", 
    //   icon: "💎",
    //   description: "Telegram-native blockchain"
    // },
]
