class AvalancheDangerColor {
    static get low() { return '#00c346' }
    static get moderate() { return '#fcfc00' }
    static get considerate() { return '#ff9100' }
    static get high() { return '#cc332c' }
    static get extreme() { return '#222222' }

    static get map() {
        return {
           'None':  null,
           'Low':  AvalancheDangerColor.low,
           'Moderate':  AvalancheDangerColor.moderate,
           'Considerate':  AvalancheDangerColor.considerate,
           'High':  AvalancheDangerColor.high,
           'Extreme':  AvalancheDangerColor.extreme,
        }
    }
}
