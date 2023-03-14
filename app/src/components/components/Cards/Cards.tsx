import {
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvCardMedia,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import compressor from "./assets/compressor.png";

export const Cards = () => {
  return (
    <HvCard
      bgcolor="atmo1"
      statusColor="sema4"
      style={{ width: 360 }}
      selectable
    >
      <HvCardHeader
        title="Asset Avatar L90"
        subheader="Compressor"
        aria-label="Compressor"
      />
      <HvCardMedia
        component="img"
        alt="Compressor"
        height={140}
        image={compressor}
      />
      <HvCardContent>
        <div style={{ paddingTop: "20px" }}>
          <HvTypography variant="label">ID</HvTypography>
          <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
        </div>
        <div style={{ marginTop: "20px" }}>
          <HvTypography variant="label">Last connected</HvTypography>
          <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
        </div>
      </HvCardContent>
    </HvCard>
  );
};