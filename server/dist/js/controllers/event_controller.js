"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.addEvent = exports.getEvents = void 0;
const event_model_1 = __importDefault(require("./../models/event_model"));
const express_validator_1 = require("express-validator");
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_model_1.default.find();
        res.status(200).json({ events });
    }
    catch (error) {
        throw error;
    }
});
exports.getEvents = getEvents;
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        errors.throw();
        const body = req.body;
        const event = new event_model_1.default({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            date: body.date,
        });
        const newEvent = yield event.save();
        const allEvents = yield event_model_1.default.find();
        res.status(201).json({
            message: "Event added",
            event: newEvent,
            events: allEvents
        });
    }
    catch (error) {
        res.status(400).json({ error });
        throw error;
    }
});
exports.addEvent = addEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedEvent = yield event_model_1.default.findByIdAndRemove(req.params.id);
        const allEvents = yield event_model_1.default.find();
        res.status(200).json({
            message: 'Event deleted',
            event: deletedEvent,
            events: allEvents,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteEvent = deleteEvent;
