using sap.cap.airline as my from '../db/schema';

service mostrar {
    @readonly entity aeronave as projection on my.Aeronave;
}