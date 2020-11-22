class AvalancheDangerColor {
    static colorForId(id) {
        try {
            return AvalancheDangerColor.ALL[id]
        } catch {
            throw `Invalid rose petal color value: ${id}`;
        }
    }
}

AvalancheDangerColor.LOW = '#00c346';
AvalancheDangerColor.MODERATE = '#fcfc00';
AvalancheDangerColor.CONSIDERATE = '#ff9100';
AvalancheDangerColor.HIGH = '#cc332c';
AvalancheDangerColor.EXTREME = '#222222';
AvalancheDangerColor.ALL = [
    null,
    AvalancheDangerColor.LOW,
    AvalancheDangerColor.MODERATE,
    AvalancheDangerColor.CONSIDERATE,
    AvalancheDangerColor.HIGH,
    AvalancheDangerColor.EXTREME,
]
