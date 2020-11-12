class AvalancheDangerColor {
    static get low() { return '#00c346' }
    static get moderate() { return '#fcfc00' }
    static get considerate() { return '#ff9100' }
    static get high() { return '#cc332c' }
    static get extreme() { return '#222222' }

    static colorForId(id) {
        try {
            return AvalancheDangerColor.ALL[id]
        } catch {
            throw `Invalid rose petal color value: ${id}`;
        }
    }
}

AvalancheDangerColor.ALL = [
    null,
    AvalancheDangerColor.low,
    AvalancheDangerColor.moderate,
    AvalancheDangerColor.considerate,
    AvalancheDangerColor.high,
    AvalancheDangerColor.extreme,
]
