"use client";

import { Timestamp } from "firebase/firestore";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Vehicle } from "@/Entities/Vehicle.model";

type VehicleCardProps = {
  vehicle: Vehicle;
};

const styles = {
  card: "overflow-hidden border-none h-full shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col",
  header: "bg-emerald-400/90 hover:bg-emerald-400 transition-colors duration-200 p-4 flex-none",
  title: "text-lg font-bold text-emerald-950 truncate",
  description: "text-gray-950 font-medium text-sm",
  content: "bg-zinc-200 p-4 flex-grow",
  grid: "grid grid-cols-2 gap-x-6 gap-y-4 text-sm",
  label: "text-zinc-700 font-medium",
  value: "font-semibold text-zinc-900",
  footer: "bg-zinc-300 p-4 flex justify-between items-center text-sm flex-none",
  section: "space-y-1",
  fullWidth: "col-span-2",
  infoContainer: "flex flex-col h-full",
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  
  const formatDate = (date: string | Timestamp) => {
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>
          {vehicle.vehicleManufacturer} {vehicle.vehicleModel}
        </CardTitle>
        <CardDescription className={styles.description}>
          Dodat: {formatDate(vehicle.vehicleDateCreated)}
        </CardDescription>
      </CardHeader>
      <CardContent className={styles.content}>
        <div className={styles.infoContainer}>
          <div className={styles.grid}>
            <div className={styles.section}>
              <p className={styles.label}>Zapremina</p>
              <p className={styles.value}>{vehicle.vehicleDisplacement} ccm</p>
            </div>
            <div className={styles.section}>
              <p className={styles.label}>Gorivo</p>
              <p className={styles.value}>{vehicle.vehicleFuelType}</p>
            </div>
            <div className={styles.section}>
              <p className={styles.label}>Snaga</p>
              <p className={styles.value}>{vehicle.vehiclePower} ks</p>
            </div>
            <div className={styles.section}>
              <p className={styles.label}>Registracija</p>
              <p className={styles.value}>{vehicle.vehiclePlateNumber}</p>
            </div>
            <div className={`${styles.section} ${styles.fullWidth}`}>
              <p className={styles.label}>Broj šasije</p>
              <p className={styles.value}>{vehicle.vehicleIdNumber}</p>
            </div>
            {vehicle.vehicleDesc && (
              <div className={`${styles.section} ${styles.fullWidth}`}>
                <p className={styles.label}>Opis</p>
                <p className={`${styles.value} whitespace-pre-wrap`}>{vehicle.vehicleDesc}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className={styles.footer}>
        <p className={styles.label}>Kilometraža</p>
        <p className={styles.value}>{vehicle.vehicleMilage.toLocaleString()} km</p>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
