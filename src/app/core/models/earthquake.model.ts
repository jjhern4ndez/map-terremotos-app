
export interface DataCollection {
    type:     string;
    metadata: Metadata;
    features: EarthquakeFeature[];
    bbox:     number[];
}

export interface EarthquakeFeature {
    type:       FeatureType;
    properties: Properties;
    geometry:   Geometry;
    id:         string;
}

export interface Geometry {
    type:        GeometryType;
    coordinates: number[];
}

export enum GeometryType {
    Point = "Point",
}

export interface Properties {
    mag:     number;
    place:   string;
    time:    number;
    updated: number;
    tz:      null;
    url:     string;
    detail:  string;
    felt:    number | null;
    cdi:     number | null;
    mmi:     number | null;
    alert:   Alert | null;
    status:  Status;
    tsunami: number;
    sig:     number;
    net:     Net;
    code:    string;
    ids:     string;
    sources: Sources;
    types:   string;
    nst:     number;
    dmin:    number;
    rms:     number;
    gap:     number;
    magType: MagType;
    type:    PropertiesType;
    title:   string;
}

export enum Alert {
    Green = "green",
    Red = "red",
    Yellow = "yellow",
}

export enum MagType {
    MB = "mb",
    Ml = "ml",
    Mw = "mw",
    Mwr = "mwr",
    Mww = "mww",
}

export enum Net {
    Ak = "ak",
    Hv = "hv",
    PR = "pr",
    Tx = "tx",
    Us = "us",
}

export enum Sources {
    AkAtUs = ",ak,at,us,",
    AkUs = ",ak,us,",
    AkUsAt = ",ak,us,at,",
    AtPtUs = ",at,pt,us,",
    AtUs = ",at,us,",
    HvUs = ",hv,us,",
    PtUs = ",pt,us,",
    PtUsPR = ",pt,us,pr,",
    Us = ",us,",
    UsAk = ",us,ak,",
    UsAtAk = ",us,at,ak,",
    UsAtPt = ",us,at,pt,",
    UsEw = ",us,ew,",
    UsTx = ",us,tx,",
}

export enum Status {
    Reviewed = "reviewed",
}

export enum PropertiesType {
    Earthquake = "earthquake",
}

export enum FeatureType {
    Feature = "Feature",
}

export interface Metadata {
    generated: number;
    url:       string;
    title:     string;
    status:    number;
    api:       string;
    count:     number;
}
